(() => {
  const C = StudyNookConfig;

  function item(id) {
    return C.items.find(x => x.id === id);
  }

  function img(src, cls) {
    if (!src) return "";
    return `<img class="layer ${cls}" src="${src}" alt="">`;
  }

  function renderAvatar(config) {
    const avatar = document.getElementById("avatar");

    const skin =
      C.skinTones[config.skinTone] ||
      C.skinTones.medium;

    const hair = item(config.hair);
    const face = item(config.face);
    const top = item(config.top);
    const bottom = item(config.bottom);
    const shoes = item(config.shoes);
    const hijab = item(config.hijab);
    const glasses = item(config.glasses);
    const bag = item(config.bag);

    const accessories = (config.accessories || [])
      .map(id => img(item(id)?.asset, "accessory"))
      .join("");

    avatar.innerHTML = `

      <!-- HAIR BEHIND THE BODY -->
      ${
        !hijab && hair
          ? img(hair.asset, "hair-back")
          : ""
      }

      <!-- BODY -->
      <svg
        class="layer base"
        viewBox="0 0 320 420"
        aria-hidden="true"
      >
        <!-- floor shadow -->
        <ellipse
          cx="160"
          cy="392"
          rx="88"
          ry="13"
          fill="#d9cdbd"
          opacity=".45"
        />

        <!-- torso -->
        <path
          d="
            M124 171
            Q137 160 145 158
            L175 158
            Q184 160 196 171
            L202 270
            Q160 286 118 270
            Z
          "
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- left arm -->
        <path
          d="
            M123 177
            Q110 183 105 202
            L100 259
            Q101 270 111 271
            Q120 269 121 259
            L128 205
            Z
          "
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- right arm -->
        <path
          d="
            M197 177
            Q210 183 215 202
            L220 259
            Q219 270 209 271
            Q200 269 199 259
            L192 205
            Z
          "
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- neck -->
        <rect
          x="145"
          y="135"
          width="30"
          height="43"
          rx="12"
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- head -->
        <circle
          cx="160"
          cy="104"
          r="68"
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- left leg -->
        <path
          d="
            M121 269
            L156 269
            L152 355
            L116 355
            Z
          "
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />

        <!-- right leg -->
        <path
          d="
            M164 269
            L199 269
            L204 355
            L168 355
            Z
          "
          fill="${skin}"
          stroke="#59483f"
          stroke-width="4"
        />
      </svg>

      <!-- BOTTOMS -->
      ${img(bottom?.asset, "bottom")}

      <!-- SHOES -->
      ${img(shoes?.asset, "shoes")}

      <!-- TOP -->
      ${img(top?.asset, "top-clothing")}

      <!-- FACE -->
      ${img(face?.asset, "face")}

      <!-- FRONT PART OF HAIR -->
      ${
        !hijab && hair
          ? img(hair.asset, "hair-front")
          : ""
      }

      <!-- HIJAB -->
      ${img(hijab?.asset, "hijab")}

      <!-- ACCESSORIES -->
      ${accessories}

      <!-- GLASSES -->
      ${img(glasses?.asset, "glasses")}

      <!-- BAG -->
      ${img(bag?.asset, "bag")}
    `;
  }

  window.AvatarRenderer = {
    renderAvatar
  };
})();
