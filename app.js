(() => {

  const C = StudyNookConfig;

  let config = {
    ...C.defaultAvatar,
    ...(AvatarStorage.load() || {})
  };

  let category = "skin";
  let xp = null;

  const $ = selector =>
    document.querySelector(selector);

  function unlocked(item) {
    return xp !== null &&
      xp >= item.xpRequired;
  }

  function equipped(item) {

    if (item.multi) {
      return (config.accessories || [])
        .includes(item.id);
    }

    return config[item.category] === item.id;
  }

  /* ==============================
     CATEGORY TABS
  ============================== */

  function renderTabs() {

    $("#tabs").innerHTML =
      C.categories.map(c => {

        let name =
          c[0].toUpperCase() +
          c.slice(1);

        if (c === "hijab") {
          name = "Hijab / Headwear";
        }

        if (c === "skin") {
          name = "Skin";
        }

        return `
          <button
            class="tab ${c === category ? "active" : ""}"
            data-cat="${c}"
          >
            ${name}
          </button>
        `;

      }).join("");

    document
      .querySelectorAll(".tab")
      .forEach(button => {

        button.onclick = () => {

          category =
            button.dataset.cat;

          renderTabs();
          renderItems();
        };

      });
  }

  /* ==============================
     SKIN TONE CARDS
  ============================== */

  function renderSkinTones() {

    $("#items").innerHTML =
      C.skinToneOptions
        .map(tone => {

          const selected =
            config.skinTone === tone.id;

          return `
            <button
              class="
                item
                skin-item
                ${selected ? "equipped" : ""}
              "
              data-skin="${tone.id}"
            >

              <span class="skin-preview">

                <span
                  class="skin-circle"
                  style="
                    background:
                    ${C.skinTones[tone.id]};
                  "
                ></span>

              </span>

              <strong>
                ${tone.name}
              </strong>

              <small>
                ${
                  selected
                    ? "✓ Equipped"
                    : "Tap to use"
                }
              </small>

            </button>
          `;

        }).join("");

    document
      .querySelectorAll("[data-skin]")
      .forEach(button => {

        button.onclick = () => {

          config.skinTone =
            button.dataset.skin;

          AvatarRenderer
            .renderAvatar(config);

          renderSkinTones();
        };

      });
  }

  /* ==============================
     CLOTHING ITEMS
  ============================== */

  function renderItems() {

    if (category === "skin") {
      renderSkinTones();
      return;
    }

    const list =
      C.items.filter(
        item =>
          item.category === category
      );

    $("#items").innerHTML =
      list.map(item => {

        const ok =
          unlocked(item);

        const eq =
          equipped(item);

        return `
          <button
            class="
              item
              ${ok ? "" : "locked"}
              ${eq ? "equipped" : ""}
            "
            data-id="${item.id}"
            ${
              ok
                ? ""
                : 'aria-disabled="true"'
            }
          >

            <span class="thumb">

              <img
                src="${item.asset}"
                alt="${item.name}"
              >

              ${
                ok
                  ? ""
                  : `
                    <b class="lock">
                      🔒
                    </b>
                  `
              }

            </span>

            <strong>
              ${item.name}
            </strong>

            <small>

              ${
                eq
                  ? "✓ Equipped"

                  : ok
                    ? "✓ Unlocked"

                    : `${item.xpRequired} XP required`
              }

            </small>

            ${
              !ok && xp !== null
                ? `
                  <em>
                    ${Math.max(
                      0,
                      item.xpRequired - xp
                    )} XP to go
                  </em>
                `
                : ""
            }

          </button>
        `;

      }).join("");

    document
      .querySelectorAll(".item[data-id]")
      .forEach(button => {

        button.onclick = () =>
          equip(button.dataset.id);

      });
  }

  /* ==============================
     EQUIP ITEM
  ============================== */

  function equip(id) {

    const item =
      C.items.find(
        x => x.id === id
      );

    if (!item ||
        !unlocked(item)) {
      return;
    }

    if (item.multi) {

      const accessories =
        new Set(
          config.accessories || []
        );

      if (accessories.has(id)) {
        accessories.delete(id);
      } else {
        accessories.add(id);
      }

      config.accessories =
        [...accessories];

    } else {

      const removable = [
        "bags",
        "glasses",
        "hijab"
      ];

      if (
        config[item.category] === id &&
        removable.includes(
          item.category
        )
      ) {

        config[item.category] = null;

      } else {

        config[item.category] = id;

      }
    }

    AvatarRenderer
      .renderAvatar(config);

    renderItems();
  }

  /* ==============================
     XP DISPLAY
  ============================== */

  function renderXP() {

    const status =
      $("#status");

    const label =
      $("#xpLabel");

    const next =
      $("#nextUnlock");

    const bar =
      $("#xpBar");

    if (xp === null) {

      label.textContent =
        "Waiting for XP…";

      status.textContent =
        "🟡 Waiting for Study Nook XP connection";

      bar.style.width = "0%";

      return;
    }

    label.textContent =
      `⭐ ${xp.toLocaleString()} XP`;

    status.textContent =
      XPIntegration.isConnected()
        ? "🟢 Connected to Study Nook"
        : "🔵 Development Mode — Test XP";

    const future =
      C.items
        .filter(
          item =>
            item.xpRequired > xp
        )
        .sort(
          (a, b) =>
            a.xpRequired -
            b.xpRequired
        );

    if (future[0]) {

      const nextItem =
        future[0];

      const previousXP =
        Math.max(
          0,
          ...C.items
            .filter(
              item =>
                item.xpRequired <= xp
            )
            .map(
              item =>
                item.xpRequired
            )
        );

      const range =
        nextItem.xpRequired -
        previousXP;

      const progress =
        range === 0
          ? 100
          : (
              (xp - previousXP) /
              range
            ) * 100;

      bar.style.width =
        Math.min(
          100,
          Math.max(
            0,
            progress
          )
        ) + "%";

      next.textContent =
        `Next unlock: ${nextItem.name} at ${nextItem.xpRequired.toLocaleString()} XP`;

    } else {

      bar.style.width =
        "100%";

      next.textContent =
        "All current rewards unlocked ✨";
    }

    $("#rewards").innerHTML =
      future
        .slice(0, 3)
        .map(item => `
          <div>
            <span>
              🔒 ${item.xpRequired.toLocaleString()} XP
            </span>
            <b>
              ${item.name}
            </b>
          </div>
        `)
        .join("") ||
        "<p>Everything is unlocked! ♡</p>";

    renderItems();
  }

  /* ==============================
     SAVE
  ============================== */

  function save() {

    AvatarStorage.save(config);

    XPIntegration.send(
      "AVATAR_UPDATED",
      {
        avatar: config
      }
    );

    $("#saveNote").textContent =
      "Saved! Your avatar configuration is ready for Study Nook ♡";

    setTimeout(() => {

      $("#saveNote").textContent = "";

    }, 3000);
  }

  /* ==============================
     RESET
  ============================== */

  function reset() {

    if (
      !confirm(
        "Reset your avatar to the default look?"
      )
    ) {
      return;
    }

    config =
      structuredClone(
        C.defaultAvatar
      );

    AvatarRenderer
      .renderAvatar(config);

    renderItems();

    save();
  }

  $("#saveBtn").onclick =
    save;

  $("#resetBtn").onclick =
    reset;

  /* ==============================
     MESSAGE EVENTS
  ============================== */

  window.addEventListener(
    "studynook:set-avatar",
    event => {

      config = {
        ...C.defaultAvatar,
        ...event.detail
      };

      AvatarRenderer
        .renderAvatar(config);

      renderItems();
    }
  );

  window.addEventListener(
    "studynook:request-avatar",
    () => {

      XPIntegration.send(
        "AVATAR_UPDATED",
        {
          avatar: config
        }
      );

    }
  );

  /* ==============================
     PUBLIC API
  ============================== */

  window.StudyNookAvatar = {

    getAvatarConfig: () =>
      structuredClone(config),

    setAvatarConfig(newConfig) {

      config = {
        ...C.defaultAvatar,
        ...newConfig
      };

      AvatarRenderer
        .renderAvatar(config);

      renderItems();
    },

    getUnlockedItems: () =>
      C.items
        .filter(unlocked)
        .map(
          item =>
            item.id
        ),

    getCurrentXP: () =>
      xp
  };

  /* START */

  renderTabs();

  AvatarRenderer
    .renderAvatar(config);

  XPIntegration.onChange(
    value => {

      xp = value;

      renderXP();
    }
  );

  renderXP();

  XPIntegration.start();

})();
