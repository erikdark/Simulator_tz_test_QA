let bids = [];
let currentBidder = null;

function submitBid() {
    const name = document.getElementById('participant-name').value;
    const amount = parseFloat(document.getElementById('bid-amount').value);

    if (name && amount) {
        bids.push({ name, amount, locked: true });
        updateBidsList();
        document.getElementById('participant-name').value = '';
        document.getElementById('bid-amount').value = '';
    } else {
        alert('Заполните все поля!');
    }
}

function updateBidsList() {
    const bidsList = document.getElementById('bids');
    bidsList.innerHTML = '';
    bids.forEach((bid, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${bid.name}: ${bid.amount} рублей`;
        bidsList.appendChild(listItem);
    });

    if (bids.length > 0) {
        document.getElementById('negotiation-section').style.display = 'block';
    }
}

function submitNewBid() {
    const amount = parseFloat(document.getElementById('new-bid-amount').value);

    if (currentBidder && amount) {
        const bidIndex = bids.findIndex(bid => bid.name === currentBidder);
        if (bidIndex > -1) {
            bids[bidIndex].amount = amount;
            updateBidsList();
            document.getElementById('new-bid-amount').value = '';
        }
    } else {
        alert('Заполните сумму заявки!');
    }
}

function selectWinner() {
    if (bids.length > 0) {
        bids.sort((a, b) => a.amount - b.amount);
        const winner = bids[0];
        document.getElementById('winner-name').textContent = `Победитель: ${winner.name}`;
        document.getElementById('winner-bid').textContent = `Сумма заявки: ${winner.amount} рублей`;
        document.getElementById('winner-section').style.display = 'block';

        // Разблокировка денег остальных участников
        bids.forEach(bid => {
            if (bid.name !== winner.name) {
                bid.locked = false;
            }
        });
    }
}

setTimeout(selectWinner, 60000);  // Выбрать победителя через 1 минуту
