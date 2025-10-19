# calc/engine.py
from dataclasses import dataclass
from sympy import sin, cos, tan, asin, acos, atan, log, ln, sqrt, pi, E, sympify
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
from sympy.core.sympify import SympifyError
from sympy import N as numeric, nsimplify

ALLOWED = {
    "sin": sin, "cos": cos, "tan": tan,
    "asin": asin, "acos": acos, "atan": atan,
    "log": log, "ln": ln, "sqrt": sqrt,
    "pi": pi, "e": E
}

TRANSFORMS = (standard_transformations + (implicit_multiplication_application,))

@dataclass
class EvalContext:
    angle: str = "rad"   # "rad" | "deg"
    precision: int = 34  # digits

def _wrap_deg(expr):
    from sympy import pi as PI
    deg_factor = PI/180
    return expr.replace(
        lambda f: f.func in (sin, cos, tan) and len(f.args)==1,
        lambda f: f.func(f.args[0]*deg_factor)
    )

def _format_display(val, precision: int) -> str:
    """Retourne une chaîne sans zéros superflus ni .0 pour les entiers."""
    # Tenter de simplifier : 3.000… -> 3
    try:
        simp = nsimplify(val)
        if getattr(simp, "is_Integer", False):
            return str(int(simp))
    except Exception:
        pass

    # Évalue à la précision demandée puis nettoie les zéros de fin
    s = str(val.evalf(n=precision, chop=True))
    # Si notation scientifique, on la laisse telle quelle
    if "e" in s or "E" in s:
        return s
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return s

def evaluate(expr_text: str, ctx: EvalContext):
    if not expr_text or len(expr_text) > 1024:
        raise ValueError("Expression vide ou trop longue.")
    try:
        expr = parse_expr(expr_text, local_dict=ALLOWED, transformations=TRANSFORMS, evaluate=False)
    except (SympifyError, SyntaxError):
        raise ValueError("Expression invalide.")
    if ctx.angle == "deg":
        expr = _wrap_deg(expr)
    try:
        val = numeric(expr, ctx.precision)
    except Exception as exc:
        raise ValueError(f"Erreur de calcul: {exc}")
    # 🔽 Retourne une chaîne “propre” (tests attendent une string équivalente)
    return _format_display(val, ctx.precision)
