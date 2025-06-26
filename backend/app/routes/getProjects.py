from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import UserCreds
from sqlalchemy import Table, inspect

getpro_bp = Blueprint('getpro', __name__)

@getpro_bp.route('/getpro', methods=['GET'])
@jwt_required(locations=["cookies"])
def getpro():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 401
    
    inspector = inspect(db.engine)
    if user.isAdmin:
        return jsonify({"projects": f"{inspector.get_table_names()}"})
    username = user.username
    projects = []
    for i in inspector.get_table_names():
        project = Table(i, db.metadata, autoload_with=db.engine)
        if i == 'user_creds' or project is None:
            continue
        if 'username' in project.columns:
            result = db.session.query(project).filter_by(username=username).first()
            if result:
                projects.append(i)
    return jsonify({"projects": projects}), 200