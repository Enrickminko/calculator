from flask import Flask, request, jsonify, render_template
from calc.engine import evaluate, EvalContext
from calc.schemas import CalcRequest
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.post("/api/calc")
def api_calc():
    try:
        payload = CalcRequest.model_validate_json(request.data or b"{}")
        res = evaluate(payload.expr, EvalContext(angle=payload.angle, precision=payload.precision))
        return jsonify({"ok": True, "result": str(res)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
