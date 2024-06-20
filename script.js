async function getMedicineInfo() {
    const medicineName = document.getElementById('medicineName').value.trim();
    const infoDiv = document.getElementById('medicineInfo');

    if (!medicineName) {
        infoDiv.innerHTML = `<p>Molimo unesite ime leka.</p>`;
        return;
    }

    try {
        const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medicineName}"`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const medicine = data.results[0];
            infoDiv.innerHTML = `
                <h2>${medicine.openfda.brand_name[0]}</h2>
                <p><strong>Namena:</strong> ${medicine.purpose ? medicine.purpose.join(', ') : 'N/A'}</p>
                <p><strong>Aktivne supstance:</strong> ${medicine.active_ingredient ? medicine.active_ingredient.join(', ') : 'N/A'}</p>
            `;
        } else {
            infoDiv.innerHTML = `<p>Lek nije pronađen. Molimo pokušajte ponovo.</p>`;
        }
    } catch (error) {
        console.error('Greška prilikom preuzimanja podataka:', error);
        infoDiv.innerHTML = `<p>Došlo je do greške prilikom pretrage. Molimo pokušajte ponovo kasnije.</p>`;
    }
}
