
async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    // if (respons.status !== 200) // Created
    //     throw new Error(respons.status);
    return await respons.text();
}


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

export function RollDies() {
    post ('/roll-die');
}

export async function showActivePlayers() {
    let retur = await get ('/show-active-players');
    return retur.players;
}

export async function GetDiceValues() {
    return await get('/get-dice-values');
}

export async function GetRollCounter() {
    let retur = await get('/get-roll-counter');
    return retur.rollCounter;
}

export async function GetFieldsResults() {
    let retur;
    retur = await get('/get-fields-results');
    return retur;
}

export async function ResetRollCounter() {
    let retur;
    retur = await get('/get-reset-roll-counter');
    return retur.rollCounter;
}

export async function HoldDie(dieIndex) {
    post('/hold-die', { dieIndex : dieIndex });
}

export async function uncheckAllDice() {
    post ('/uncheck-all-dice');
    
}