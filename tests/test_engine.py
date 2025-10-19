from calc.engine import evaluate, EvalContext

def test_addition():
  assert str(evaluate("1+2", EvalContext())) == "3"

def test_trig_deg():
  assert str(evaluate("sin(30)", EvalContext(angle="deg", precision=20)))[:4] == "0.5"

def test_power():
    assert evaluate("2^3", EvalContext()) == "8"

def test_root():
    assert evaluate("sqrt(16)", EvalContext()) == "4"

def test_log10():
    assert evaluate("log(100,10)", EvalContext()) == "2"

def test_sin_rad():
    assert evaluate("sin(pi/2)", EvalContext()) == "1"

def test_complex_domain_error():
    try:
        evaluate("sqrt(-1)", EvalContext())
    except ValueError:
        assert True
    else:
        assert False, "Doit lever ValueError pour racine négative sans mode complexe"
