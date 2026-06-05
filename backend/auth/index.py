"""
Авторизация: регистрация, вход, получение профиля, выход.
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p19153084_edu_video_access_app")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def ok(data: dict):
    return {"statusCode": 200, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data)}


def err(msg: str, code: int = 400):
    return {"statusCode": code, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    params = event.get("queryStringParameters") or {}
    action = params.get("action", "")
    method = event.get("httpMethod", "GET")
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    conn = get_conn()
    cur = conn.cursor()

    # ---- REGISTER ----
    if action == "register" and method == "POST":
        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not name or not email or not password:
            cur.close(); conn.close()
            return err("Заполните все поля")
        if len(password) < 6:
            cur.close(); conn.close()
            return err("Пароль минимум 6 символов")

        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
        if cur.fetchone():
            cur.close(); conn.close()
            return err("Email уже зарегистрирован")

        avatar_letter = name[0].upper()
        token = make_token()
        cur.execute(
            f"""INSERT INTO {SCHEMA}.users (name, email, password_hash, avatar_letter, session_token)
                VALUES (%s, %s, %s, %s, %s) RETURNING id, name, email, avatar_letter, level, streak_days, hours_studied, videos_watched, courses_started""",
            (name, email, hash_password(password), avatar_letter, token)
        )
        row = cur.fetchone()
        conn.commit()
        cur.close(); conn.close()
        return ok({
            "token": token,
            "user": {
                "id": row[0], "name": row[1], "email": row[2],
                "avatar_letter": row[3], "level": row[4],
                "streak_days": row[5], "hours_studied": float(row[6]),
                "videos_watched": row[7], "courses_started": row[8]
            }
        })

    # ---- LOGIN ----
    if action == "login" and method == "POST":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            cur.close(); conn.close()
            return err("Введите email и пароль")

        cur.execute(
            f"SELECT id, name, email, avatar_letter, level, streak_days, hours_studied, videos_watched, courses_started FROM {SCHEMA}.users WHERE email = %s AND password_hash = %s",
            (email, hash_password(password))
        )
        row = cur.fetchone()
        if not row:
            cur.close(); conn.close()
            return err("Неверный email или пароль")

        token = make_token()
        cur.execute(f"UPDATE {SCHEMA}.users SET session_token = %s WHERE id = %s", (token, row[0]))
        conn.commit()
        cur.close(); conn.close()
        return ok({
            "token": token,
            "user": {
                "id": row[0], "name": row[1], "email": row[2],
                "avatar_letter": row[3], "level": row[4],
                "streak_days": row[5], "hours_studied": float(row[6]),
                "videos_watched": row[7], "courses_started": row[8]
            }
        })

    # ---- PROFILE ----
    if action == "profile" and method == "GET":
        token = event.get("headers", {}).get("X-Session-Token") or event.get("headers", {}).get("x-session-token")
        if not token:
            cur.close(); conn.close()
            return err("Не авторизован", 401)

        cur.execute(
            f"SELECT id, name, email, avatar_letter, level, streak_days, hours_studied, videos_watched, courses_started FROM {SCHEMA}.users WHERE session_token = %s",
            (token,)
        )
        row = cur.fetchone()
        if not row:
            cur.close(); conn.close()
            return err("Сессия истекла", 401)

        cur.close(); conn.close()
        return ok({
            "user": {
                "id": row[0], "name": row[1], "email": row[2],
                "avatar_letter": row[3], "level": row[4],
                "streak_days": row[5], "hours_studied": float(row[6]),
                "videos_watched": row[7], "courses_started": row[8]
            }
        })

    # ---- LOGOUT ----
    if action == "logout" and method == "POST":
        token = event.get("headers", {}).get("X-Session-Token") or event.get("headers", {}).get("x-session-token")
        if token:
            cur.execute(f"UPDATE {SCHEMA}.users SET session_token = NULL WHERE session_token = %s", (token,))
            conn.commit()
        cur.close(); conn.close()
        return ok({"ok": True})

    cur.close(); conn.close()
    return err("Не найдено", 404)