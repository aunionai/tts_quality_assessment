(function () {
  const payload = window.E008_AB_DATA;
  const root = document.getElementById("tables");

  if (!payload || !Array.isArray(payload.languages)) {
    root.innerHTML = "<p>Comparison data is missing.</p>";
    return;
  }

  function makeAudioCell(src, label) {
    const td = document.createElement("td");
    td.className = "audio-cell";

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    audio.src = src;
    audio.setAttribute("aria-label", label);
    td.appendChild(audio);
    return td;
  }

  for (const lang of payload.languages) {
    const card = document.createElement("section");
    card.className = "language-card";

    const header = document.createElement("div");
    header.className = "language-header";
    header.innerHTML = `
      <h2>${lang.language_name} <span class="meta">(${lang.lang})</span></h2>
      <div class="meta">${lang.rows.length} samples</div>
    `;
    card.appendChild(header);

    const wrap = document.createElement("div");
    wrap.className = "table-wrap";

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th class="row-id">#</th>
          <th>ref_text</th>
          <th>ref_speech</th>
          <th>modelA</th>
          <th>modelB</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");
    lang.rows.forEach((row, index) => {
      const tr = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.className = "row-id";
      idCell.textContent = String(index + 1).padStart(2, "0");
      tr.appendChild(idCell);

      const textCell = document.createElement("td");
      textCell.className = "text-cell";
      textCell.textContent = row.text || "";
      tr.appendChild(textCell);

      tr.appendChild(makeAudioCell(row.reference_audio, `${lang.lang} reference speech ${index + 1}`));
      tr.appendChild(makeAudioCell(row.model_a_audio, `${lang.lang} model A ${index + 1}`));
      tr.appendChild(makeAudioCell(row.model_b_audio, `${lang.lang} model B ${index + 1}`));

      tbody.appendChild(tr);
    });

    wrap.appendChild(table);
    card.appendChild(wrap);
    root.appendChild(card);
  }
})();
