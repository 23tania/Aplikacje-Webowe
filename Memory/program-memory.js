// Tatiana Cieślar gr. PI-A sem. V kier. Informatyka

var openedCard1 = "";               // Pierwsza otwarta karta
var openedCard2 = "";               // Druga otwarta karta
var matchesFound = 0;               // Ilość znalezionych par
const matchesInGame = 15;           // Stała ilość par w grze
var stopClick = false;              // Blokowanie możliwości kliknięcia użytkownika na karty

// Tablica z wszystkimi kartami w grze
var cards = document.querySelectorAll("button");
cards = [...cards];

// Lista dostępnych równań
const equationsList = ["equation1","equation2","equation3","equation4","equation5","equation6",
"equation7","equation8","equation9","equation10","equation11","equation12","equation13",
"equation14","equation15"];

// Pary tych samych kart
const equationsMatches = 
{
    equation1: ['\\(\ 38 \\)', '\\(\ 6^2 + 2 \\)'],
    equation2: ['\\(\ 85 - 4 \\)', '\\(\ 9^2 \\)'],
    equation3: ['\\(\ 11 * 2 \\)', '\\(\\sqrt{400} + 2 \\)'],
    equation4: ['\\(\ 30 \\)', '\\(\\sqrt{100} * 3 \\)'],
    equation5: ['\\(\\frac{1}{2\\sqrt{x}} \\)', '\\((\\sqrt{x})^&#8242 \\)'],
    equation6: ['\\(\ 2 \\)', '\\(\\log{(100)} \\)'],
    equation7: ['\\(\ 156 \\)', '\\(\ 3* (54 - 2) \\)'],
    equation8: ['\\(\ 15 \\)', '\\(\\frac{50}{2} - 10 \\)'],
    equation9: ['\\(\ 62 \\)', '\\(\ 60 + 4 * \\frac{1}{2} \\)'],
    equation10: ['\\(\ 10 - 5 \\)', '\\(\\sqrt[3]{125} \\)'],
    equation11: ['\\(\ 1 \\)', '\\(\\cos{(0)} \\)'],
    equation12: ['\\(\ 6 \\)', '\\(\\frac{3}{4} * 8 \\)'],
    equation13: ['\\(\\frac{1}{2} * x^2 + C \\)', '\\(\\int{x dx} \\)'],
    equation14: ['\\(\\cos{(x)} \\)', '\\((\\sin{x})^&#8242 \\)'],
    equation15: ['\\(\e^x + C \\)', '\\(\\int{e^x} dx \\)']
};

function ClickedCard(e)
{
    // Zatrzymanie możliwości kliknięcia użytkownika na kartę
    if (stopClick)
    {
        return;
    }

    // Karta się otwiera
    e.className = e.className.replace('hidden','opened');

    // Ustawienie pierwszej otwartej karty (gdy jeszcze jej nie ma)
    if (openedCard1 == "" && !e.className.includes('matched'))
    {
        openedCard1 = e;
        console.log("Otwarto kartę 1");
    }
    // Ustawienie drugiej otwartej karty
    else if (openedCard2 == "" && !e.className.includes('matched') && e!=openedCard1)
    {
        openedCard2 = e;
        console.log("Otwarto kartę 2");
    }

    // Sprawdzenie czy została znaleziona para
    if (openedCard1.className == openedCard2.className && openedCard1 != "" && openedCard2 != "")
    {
        console.log("Znaleziono parę!");

        // Karty teraz stają się sparowane - już nie można na nie kliknąć
        openedCard1.className = openedCard1.className.replace('opened', 'matched');
        openedCard2.className = openedCard2.className.replace('opened', 'matched');

        // Wyzerowanie otwartych kart i dodanie znalezionej pary
        openedCard1 = "";
        openedCard2 = "";
        matchesFound++;
    }
    else if (openedCard1.className != openedCard2.className && openedCard1 != "" && openedCard2 != "")
    {
        // Powstrzymanie użytkownika przed kliknięciem na kolejne karty
        stopClick = true;
        console.log("Nie została znaleziona para");

        // Karty pozostają otwarte przez 1800 milisekund
        setTimeout(function() 
        {
            openedCard1.className = openedCard1.className.replace('opened','hidden');
            openedCard2.className = openedCard2.className.replace('opened','hidden');

            openedCard1 = "";
            openedCard2 = "";

            stopClick = false;

        }, 1800);
    }

    // Koniec gry
    if (matchesFound == matchesInGame)
    {
        location.reload();      // Załadowanie od nowa programu
        matchesFound = 0;       // Zerowanie ilości znalezionych par
        alert("WYGRANA!");
        
    }
}

// Funkcja tasująca karty
function ShuffleCards()
{
    console.log("Tasowanie kart");

    for (let equation of equationsList)
    {
        // Wybranie losowego indeksu z tablicy cards
        const cardOneIndex = parseInt(Math.random() * cards.length);
        const cardOne = cards[cardOneIndex];

        // Usunięcie karty ze zbioru aby się nie powtarzały
        cards.splice(cardOneIndex, 1);

        // Zaktualizowanie nazwy klasy karty
        cardOne.className = "card " + equation + " hidden";

        // Dobranie karty do pary
        const cardTwoIndex = parseInt(Math.random() * cards.length);
        const cardTwo = cards[cardTwoIndex];
        cards.splice(cardTwoIndex, 1);
        cardTwo.className = "card " + equation + " hidden";

        // Zaktualizowanie równania na kartach
        cardOne.innerHTML = equationsMatches[equation][0];
        cardTwo.innerHTML = equationsMatches[equation][1];
    }

}

ShuffleCards();
