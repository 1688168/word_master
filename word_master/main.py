from flask import Flask,  flash, make_response, jsonify
from word_master.wm_model import WM_data_provider
from flask_cors import CORS

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app)
    app.config['WM_DB_OBJ'] = WM_data_provider()
    with app.app_context():
        from word_master.wm_views import wm
        app.register_blueprint(wm, url_prefix="/wm")
    return app

app = create_app()

@app.route('/')
def hello():
    resp=make_response(
        jsonify({"msg": "success"}),
        200
    )
    return resp



if __name__ == '__main__':
    app.run(port=5000, debug=False, use_reloader=False)


