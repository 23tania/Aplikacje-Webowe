// Tatiana Cieślar gr. PI-A sem. V kier. Informatyka

var operationPerformed = false;                 // Wartość boolean wskazująca czy wykonane jest działanie
var value = 0.0;                                // Pierwszy argument działania 2 argumentowego
var isResult = false;                           // Wartość boolean wskazująca czy jest obliczony wynik
var isZeroCommaNecessary = false;               // Wartość wskazująca czy program musi dopisać kropkę przy 0
var isOneArgumentOperationPerformed = false;    // Wartość wskazująca czy wykonywane jest 1-argumentowe działanie
var newOperation = "";                          // Aktualna operacja

// Funkcja wykonywana gdy użytkownik wciśnie cyfrę na kalkulatorze
function ClickNumber(clicked)
{
    if (isResult==true && isZeroCommaNecessary==false)
    {
        // Czyszczenie wyniku po wykonanych obliczeniach
        document.getElementById("Result").innerHTML = "";
        document.getElementById("Equation").innerHTML = "";
        isResult = false;
    }

    if (isOneArgumentOperationPerformed==true && operationPerformed==false)
    {
        // Przy wykonywaniu operacji 1-argumentowych
        document.getElementById("Result").innerHTML = "";
        document.getElementById("Equation").innerHTML = "";
    }

    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
    }

    if(document.getElementById("Result").innerHTML == "0" || operationPerformed==true)
    {
        document.getElementById("Result").innerHTML = "";
    }

    operationPerformed = false;
    isOneArgumentOperationPerformed = false;

    // Dopisywanie wpisanych przez użytkownika cyfr
    document.getElementById("Result").innerHTML += clicked;
}

// Funkcja wykonywana po kliknięciu na 1 z operacji: +-*/ i potęgowanie
function ClickOperation(operation)
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        // Przywrócenie ekranu z wynikiem na 0 gdy jest wyświetlony komunikat
        document.getElementById("Result").innerHTML = "0";
    }

    // Gdy użytkownik próbuje wykonać dzielenie przez 0
    if (divideByZero() == true)
    {
        document.getElementById("Result").innerHTML = "No division by 0!";
        operationPerformed = true;
        newOperation = "";
    }

    else if (value != "0")
    {
        // Wymuszenie na programie przekalkulowania wyniku
        ClickEquals("noResult");
        operationPerformed = true;
        newOperation = operation;

        document.getElementById("Equation").innerHTML = value + " " + newOperation;
    }

    else
    {
        newOperation = operation;
        value = document.getElementById("Result").innerHTML;
        document.getElementById("Equation").innerHTML = value + " " + newOperation;

        operationPerformed = true;
    }


}

// Funkcja wykonywana gdy użytkownik wciśnie klawisz "="
function ClickEquals(czyJestResult)
{
    // Gdy wymuszamy wykonanie wyniku z poziomu funkcji ClickOperation
    if (czyJestResult == "noResult")
    {
        isResult = false;
    }
    else
    {
        isResult = true;
    }    

    // Gdy jest wykonywane dzielenie przez 0
    if (divideByZero() == true)
    {
        document.getElementById("Result").innerHTML = "No division by 0!";
    }

    // Gdy na ekranie wyświetlony jest komunikat
    else if (document.getElementById("Result").innerHTML == "No division by 0!" || 
             document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
    }

    else
    {
        // Nowa wartość wpisana przez użytkownika - drugi argument w działaniu 2-argumentowym
        var newValue = document.getElementById("Result").innerHTML;

        // Obliczanie przez program jednego z podstawowych działań
        if (newOperation == "+" && operationPerformed == false)
        {
            document.getElementById("Equation").innerHTML += " " + newValue + " =";
            document.getElementById("Result").innerHTML = Math.round((parseFloat(value) + parseFloat(newValue)) * 100000000)/100000000;
        }
        else if (newOperation == "-" && operationPerformed == false)
        {
            document.getElementById("Equation").innerHTML += " " + newValue + " =";
            document.getElementById("Result").innerHTML = Math.round((parseFloat(value) - parseFloat(newValue)) * 100000000)/100000000;
        }
        else if (newOperation == "*" && operationPerformed == false)
        {
            document.getElementById("Equation").innerHTML += " " + newValue + " =";
            document.getElementById("Result").innerHTML = Math.round(parseFloat(value) * parseFloat(newValue) * 100000000)/100000000;
        }
        else if (newOperation == "/" && operationPerformed == false)
        {
            document.getElementById("Equation").innerHTML += " " + newValue + " =";
            document.getElementById("Result").innerHTML = Math.round(parseFloat(value) / parseFloat(newValue) * 100000000)/100000000;
        }
        else if (newOperation == "^" && operationPerformed == false)
        {
            // Sprawdzenie czy liczba ujemna nie jest potęgowana do ułamka - wykluczenie pierwiastkowania ujemnych liczb
            if (Number.isNaN(Math.round(Math.pow(parseFloat(value), parseFloat(newValue))*100000000)/100000000))
            {
                newOperation = "";
                document.getElementById("Equation").innerHTML = "";
                document.getElementById("Result").innerHTML = "Incorrect value!";
            }
            else
            {
                document.getElementById("Equation").innerHTML += " " + newValue + " =";
                document.getElementById("Result").innerHTML = Math.round(Math.pow(parseFloat(value), parseFloat(newValue))*100000000)/100000000;            
            }
            
        }
        else
        {
            document.getElementById("Equation").innerHTML = "";
        }

        // Nową wartością staje się obliczony przez nas wynik, operacja się zeruje
        value = document.getElementById("Result").innerHTML;
        newOperation = "";

    }

    operationPerformed = false;
    

}

// Funkcja sprawdzająca czy jest wykonywane dzielenie przez 0
function divideByZero()
{
    if (newOperation == "/" && document.getElementById("Result").innerHTML=="0")
    {
        newOperation = "";
        document.getElementById("Equation").innerHTML = "";
        return true;
    }
    else
    {
        return false;
    }
}

// Funkcja zamieniająca znak +/-
function ClickPlusMinus()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
    }

    var val = document.getElementById("Result").innerHTML;
    val = parseFloat(val) * (-1);
    document.getElementById("Result").innerHTML = val;
}

// Funkcja odpowiadająca za wprowadzanie liczb dziesiętnych
function ClickComma()
{
    if (operationPerformed == false)
    {
        // Jeżeli kropka jeszcze nie jest wpisana
        if (!document.getElementById("Result").innerHTML.includes("."))
        {
            document.getElementById("Result").innerHTML += ".";
            isResult = false;
        }
        isZeroCommaNecessary = false;
    }

    else
    {
        // Gdy jeszcze nie wykonano żadnej operacji, a mamy 0 na ekranie
        document.getElementById("Result").innerHTML = "0.";
        operationPerformed = false;
        isZeroCommaNecessary = true;
    }
}

// Czyszczenie ekranu
function ClickC()
{
    document.getElementById("Result").innerHTML = "0";
    newOperation = "";
    document.getElementById("Equation").innerHTML = "";
}

function ClickCE()
{
    document.getElementById("Result").innerHTML = "0";
}

// Operacje jednoargumentowe

// Podnoszenie do drugiej potęgi
function ClickPower()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }
    else
    {
        // Zapisanie w pasku z równaniem jednoargumentowego działania
        document.getElementById("Equation").innerHTML = "(" + document.getElementById("Result").innerHTML + ")" + "2".sup() + " =";
        var val2 = document.getElementById("Result").innerHTML;
        val2 = parseFloat(val2) * parseFloat(val2);
        val2 = Math.round(val2 * 100000000)/100000000;
        document.getElementById("Result").innerHTML = val2;
        isOneArgumentOperationPerformed = true;
    }
}

// Pierwiastkowanie
function ClickSqrt()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;
        if (parseFloat(val2) < 0.0)
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = '&#8730' + "(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.sqrt(parseFloat(val2)); 
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }

    
}

// Sin
function ClickSin()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        document.getElementById("Equation").innerHTML = "sin(" + document.getElementById("Result").innerHTML + ") =";
        var val2 = document.getElementById("Result").innerHTML;
        val2 = Math.sin(parseFloat(val2));
        val2 = Math.round(val2 * 100000000)/100000000;
        document.getElementById("Result").innerHTML = val2;
        isOneArgumentOperationPerformed = true;
    }
    
}

// Cos
function ClickCos()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }
    else
    {
        document.getElementById("Equation").innerHTML = "cos(" + document.getElementById("Result").innerHTML + ") =";
        var val2 = document.getElementById("Result").innerHTML;
        val2 = Math.cos(parseFloat(val2));
        val2 = Math.round(val2 * 100000000)/100000000;
        document.getElementById("Result").innerHTML = val2;
        isOneArgumentOperationPerformed = true;
    }
}

// Tan
function ClickTan()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;

        if (Number.isNaN(val2))
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = "tan(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.tan(parseFloat(val2)); 
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }
    
}

// Arcsin
function ClickArcsin()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;
        if (parseFloat(val2) > 1 || parseFloat(val2) < -1)
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = "arcsin(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.asin(parseFloat(val2)); 
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }
    
}

// Arccos
function ClickArccos()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;
        if (parseFloat(val2) > 1 || parseFloat(val2) < -1)
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = "arccos(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.acos(parseFloat(val2));
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }
    
}

// Arctan
function ClickArctan()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        document.getElementById("Equation").innerHTML = "arctan(" + document.getElementById("Result").innerHTML + ") =";
        var val2 = document.getElementById("Result").innerHTML;
        val2 = Math.atan(parseFloat(val2));
        val2 = Math.round(val2 * 100000000)/100000000;
        document.getElementById("Result").innerHTML = val2;

        isOneArgumentOperationPerformed = true;
    }
    
}

// Logarytm dziesiętny
function ClickLog()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;
        if (parseFloat(val2) <= 0.0)
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = "log(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.log10(parseFloat(val2));
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }

    
}

// Logarytm naturalny
function ClickLn()
{
    if (document.getElementById("Result").innerHTML == "No division by 0!" || 
        document.getElementById("Result").innerHTML == "Incorrect value!")
    {
        document.getElementById("Result").innerHTML = "0";
        document.getElementById("Equation").innerHTML = "";
    }

    else
    {
        var val2 = document.getElementById("Result").innerHTML;
        if (parseFloat(val2) <= 0.0)
        {
            document.getElementById("Result").innerHTML = "Incorrect value!";
            document.getElementById("Equation").innerHTML = "";
        }
        else
        {
            document.getElementById("Equation").innerHTML = "ln(" + document.getElementById("Result").innerHTML + ") =";
            val2 = Math.log(parseFloat(val2));
            val2 = Math.round(val2 * 100000000)/100000000;
            document.getElementById("Result").innerHTML = val2;
        }
        isOneArgumentOperationPerformed = true;
    }
    
}