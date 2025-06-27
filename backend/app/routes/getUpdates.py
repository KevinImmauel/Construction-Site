from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, csrf
from app.models import UserCreds, ProjectsTable
from sqlalchemy import Table, inspect, select # Import select

getupdates_bp = Blueprint('getupdates', __name__)

@getupdates_bp.route('/getupdates', methods=['GET'])
@jwt_required(locations=["cookies"])
@csrf.exempt
def get_all_project_updates():
    user_id = get_jwt_identity()
    user = UserCreds.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 401

    projectname = request.args.get('project_data_name')
    if not projectname:
        return jsonify({'err': 'Missing project_data_name in query parameters'}), 400

    username = user.username

    project_entry = ProjectsTable.query.filter_by(projectname=projectname).first()
    if not project_entry:
        return jsonify({'err': 'Project not found'}), 404

    try:
        project_members_table = Table(projectname, db.metadata, autoload_with=db.engine)
    except Exception as e:
        return jsonify({'err': f'Error loading project member table: {str(e)}'}), 500

    project_member = db.session.query(project_members_table).filter_by(username=username).first()

    if not user.isAdmin and (not project_member or not project_member.isLeader):
        return jsonify({"err": "Not authorized to view updates for this project"}), 403


    try:
        project_updates_table = Table(projectname + "_updates", db.metadata, autoload_with=db.engine)

        stmt = select(
            project_updates_table.c.id,
            project_updates_table.c.username,
            project_updates_table.c.update_desc,
            project_updates_table.c.approved,
            project_updates_table.c.percentage
        )
        stmt = stmt.order_by(project_updates_table.c.id.desc())

        result = db.session.execute(stmt).fetchall()

        updates_list = []
        for row in result:
            updates_list.append({
                'id': row.id,
                'username': row.username,
                'update_desc': row.update_desc,
                'approved': bool(row.approved),
                'percentage': row.percentage
            })

        return jsonify({'data': updates_list}), 200

    except Exception as e:
        print(f"Error fetching updates for project {projectname}: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'err': f'Server error fetching updates: {str(e)}'}), 500