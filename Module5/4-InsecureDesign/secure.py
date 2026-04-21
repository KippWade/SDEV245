from flask import request
import secrets
import datetime

@app.route('/reset-password', methods=['POST'])
def reset_password():
    email = request.form['email']
    token = request.form.get('token')
    new_password = request.form['new_password']

    user = User.query.filter_by(email=email).first()
    if not user or not verify_reset_token(user, token):
        return jsonify({"error": "Invalid or expired token"}), 400

    # Enforce strong password policy
    if len(new_password) < 12:
        return jsonify({"error": "Password too weak"}), 400

    user.password = hash_password(new_password)   # Use secure hashing from A02
    db.session.commit()

    # Notify user of password change
    send_password_changed_email(user.email)
    return jsonify({"message": "Password reset successfully"})
    