from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies
from app.models import UserCreds
from app import csrf,db

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
@csrf.exempt
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = UserCreds.query.filter_by(username=username).first()
    #FOR DINESH TO ENCRYPT PSSWRD
    #if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
    if user and password == user.password:
        access_token = create_access_token(identity=str(user.id))
        response = jsonify({'message': 'Login successful', 'username': f'{user.username}'})
        set_access_cookies(response, access_token)
        return response,200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
    
#THIS METHOD SHOULD NOT BE INCLUDED IN THE MAIN PRODUCT
    
@login_bp.route('/add_user',methods=['POST'])
@csrf.exempt
def add_user():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    isAdmin = data.get('isAdmin',False)
    score = data.get('score',0)

    if not username or not email or not password:
        return jsonify({'error': 'bruh'}), 400
    
    if UserCreds.query.filter_by(username=username).first():
        return jsonify({'err': 'already exists'}), 400
    
    newUser = UserCreds(
        username=username,
        email=email,
        password=password,
        isAdmin=isAdmin,
        score=score
    )

    try:
        db.session.add(newUser)
        db.session.commit()
        return jsonify({'msg':'done gud'}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg':f'failed {e}'})
    
@login_bp.route('/logout', methods=['POST'])
@csrf.exempt
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    session.clear()
    return response
