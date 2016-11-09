vokativ pro JS
=======

> Děkuji [@Mimino666](https://github.com/Mimino666) za skvěle připravený Python kód, který jsem tímto přepsal do Javascriptu.
> Zde je [originální repozitář](https://github.com/Mimino666/vokativ).

#### Oslovte své uživatele správně!


Instalace
=========

    $ npm i -S vokativ

Podporované verze NodeJS 6.x+

Použití
=======

```javascript
const { vokativ, isWoman } = require('vokativ');

console.log(vokativ('Tom')); // "tome"
console.log(isWoman('Tom')); // false
```

Funkce **vokativ()** bere jako první argument vlastní jméno v 1. pádu jednotného čísla a vrátí ho vyskloňované v 5. pádu.
Návratová hodnota funkce je vždy řetězec s malými písmeny typu *unicode*.
Upozorňujeme, že funkce nemusí fungovat správně pro jména cizího původu.

### Další volitelné argumenty jsou:

#### woman

Použijte *True*, pokud si přejete zadané jméno skloňovat jako ženské.

Použijte *False*, pokud si přejete zadané jméno skloňovat jako mužské.

Ve výchozím případě je pohlaví detekováno automaticky.

```
>>> vokativ('Michel')  # automaticky skloňuje jako mužské jméno
u'micheli'
>>> vokativ('Michel', woman=False)
u'micheli'
>>> vokativ('Michel', woman=True)
u'michel'
```

#### last_name

Použijte *True*, pokud si přejete zadané jméno skloňovat jako příjmení.

Použijte *False*, pokus si přejete zadané jméno skloňovat jako křestní jméno.

Ve výchozím případě je typ jména detekován automaticky.

Hodnota tohoto parametru ovlivňuje pouze skloňování ženských jmen.

```
>>> vokativ('Ivanova')  # automaticky skloňuje jako příjmení
u'ivanova'
>>> vokativ('Ivanova', last_name=True)
u'ivanova'
>>> vokativ('Ivanova', last_name=False)
u'ivanovo'
```

Automatická detekce pohlaví
===========================

Knihovna **vokativ** poskytuje taky jednoduchou funkci na detekci pohlaví podle křestního jména či příjmení.
Pro četnosti jmen v ČR podle [statistického úřadu](http://www.mvcr.cz/clanek/cetnost-jmen-a-prijmeni-722752.aspx)
funkce funguje správně v 99.7% případů.
