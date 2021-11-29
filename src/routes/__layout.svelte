<main>
  <div class="wrapper">
    <div class="container" id="container">
      <div class="box item1">grid-area: header</div>
      <nav class="box side-navigation">
        <h1>
          Usage
        </h1>
      </nav>
      <div class="box content">
        <slot />
      </div>
    </div>
  </div>
</main>

<style>
  :root {
  --celeste: hsla(178, 100%, 87%, 1);
  --celeste-2: hsla(174, 100%, 81%, 1);
  --aquamarine: hsla(153, 100%, 74%, 1);
  --green-sheen: hsla(164, 39%, 58%, 1);
  --black-coral: hsla(209, 10%, 41%, 1);
  --danger: hsla(6, 57%, 49%, 1);
  --white: hsla(255, 100%, 100%, 1);

    /* $gradient-top: linear-gradient(0deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-right: linear-gradient(90deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-bottom: linear-gradient(180deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-left: linear-gradient(270deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-top-right: linear-gradient(45deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-bottom-right: linear-gradient(135deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-top-left: linear-gradient(225deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-bottom-left: linear-gradient(315deg, #bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
    $gradient-radial: radial-gradient(#bdfffdff, #9ffff5ff, #7cffc4ff, #6abea7ff, #5e6973ff);
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas: 
      "header  header"
      "content content";
    gap: 10px;
    background-color: var(--color-stroke);
    padding: .5em;
    border-radius: 3px;
  }

  @media (min-width: 500px) {
    .container {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 
        "header  header  header"
        "sidebar content content";
    }
  }

  .item1 {
    grid-area: header;
  }

  .side-navigation {
    grid-area: sidebar;
  }

  .content {
    grid-area: content;
  }
</style>