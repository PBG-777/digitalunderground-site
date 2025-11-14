async function loadTrends() {
    try {
        const res = await fetch("./data/trends.json");
        const data = await res.json();

        console.log("Echte Trenddaten geladen:", data);

        updateMeta(data.meta, data.top_positive_entities.length);
        updateTopEntities(data.top_positive_entities);

    } catch (err) {
        console.error("Fehler beim Laden der Trends:", err);
    }
}

function updateMeta(meta, topN) {
    const metaBox = document.getElementById("meta-box");
    if (!metaBox) return;

    metaBox.innerHTML = `
        <p><strong>Analyzed comments:</strong> ${meta.comments_analyzed}</p>
        <p><strong> Trending Mentions :</strong> ${topN}</p>
    `;
}

function updateTopEntities(entities) {
    const list = document.getElementById("top-entities-list");
    if (!list) return;

    list.innerHTML = "";

    entities.forEach(ent => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${ent.name}</span>
            <span>${ent.count}</span>
        `;
        list.appendChild(li);
    });
}

loadTrends();