// Strings that only the counter-slip page needs. Store titles, support text and
// the privacy link stay in content/product-sites/NoBuyCart.mjs.
// Facts are limited to FACTS.md (27 Oct 2026) and the screens it describes.
// Example amount 100, written with the locale's symbol. Register prices only
// where FACTS.md states them.
const en = {
  meta: 'Save the wish, the price and what prompted it. Come back and record the decision.',
  h1: 'Save the wish. Decide later.',
  lede: 'The price, what prompted the wish, and the decision when you come back.',
  slip: {
    name: 'A cotton jacket',
    price: '$100',
    promptLabel: 'What prompted it',
    promptHint: 'An advertisement, a promotion, or whatever caught you.',
    choiceLabel: 'The decision',
    choices: [['buy', 'I chose to buy'], ['pass', 'I chose not to buy'], ['later', 'Not sure yet']],
    noted: 'Noted.',
    clear: 'Clear the note',
  },
  foreign: '',
  save: {
    title: 'Save the wish before you decide',
    body: [
      'A price and a currency, an image, a link or a reminder.',
      'On iPhone, the share sheet saves a text or a URL.',
    ],
    alt: 'Wish editor in NoBuyCart: a cotton jacket, a price of $100, what prompted it, a note and an image.',
    cap: 'The editor: a cotton jacket, $100, what prompted it, a note, an image.',
  },
  list: {
    title: 'A cotton jacket, a reading lamp, a travel bag',
    body: [
      'The list keeps each wish with the decision you record.',
      'Long-press and drag to reorder, or group wishes by category.',
    ],
    alt: 'Wish list in NoBuyCart: a cotton jacket, a reading lamp and a travel bag, each with a decision.',
    cap: 'The list: a cotton jacket, a reading lamp, a travel bag, each with a decision.',
  },
  decide: {
    title: 'Three notes, when you are ready',
    body: ['I chose to buy. I chose not to buy. Not sure yet.'],
    alt: 'Decision screen in NoBuyCart: I chose to buy, I chose not to buy, or Not sure yet.',
    cap: 'I chose to buy, I chose not to buy, Not sure yet.',
  },
  history: {
    title: 'The decision stays on the wish',
    body: [
      'Open the history and change the decision.',
      'Delete one history entry. Archive a wish you bought, and bring it back when you need it.',
    ],
    alt: 'Decision history in NoBuyCart, with the control to change the decision.',
    cap: 'The history of a decision, and the control to change it.',
  },
  review: {
    title: 'Your amounts, by currency and by decision',
    body: [
      'The review lines up the amounts you entered, by currency and by decision.',
      'A separate shop of 9 fictional products.',
    ],
    alt: 'Review in NoBuyCart: the amounts you entered, grouped by currency and by decision.',
    cap: 'Amounts you entered, by currency and by decision.',
  },
  november: {
    title: 'No Buy November',
    when: '1 to 30 November 2026',
    body: 'From 1 to 30 November 2026, version 1.5.0 and later opens a No Buy November screen. Free.',
  },
  register: {
    title: 'The Register, once',
    freeLabel: 'Free',
    free: 'Wishes, decisions, their history and the review overview.',
    paidLabel: 'The Register',
    paid: 'Your decisions compared by prompt, category and period, and the detailed history of fictional orders.',
    price: '€4.99 once, on the paywall. $4.69 once, on Google Play in the United States.',
    kept: 'If you already had access, you keep it.',
  },
  device: 'Your wishes stay on the device.',
  outro: 'The list and the decisions are free.',
  other: 'Other apps by Benjamin Dupin',
};

const fr = {
  meta: 'Notez l’envie, le prix et ce qui l’a provoquée. Revenez pour la décision.',
  h1: 'Notez l’envie. Décidez plus tard.',
  lede: 'Le prix, ce qui vous a donné envie, et la décision quand vous y revenez.',
  slip: {
    name: 'Veste en coton',
    price: '100\u00a0€',
    promptLabel: 'Ce qui vous a donné envie',
    promptHint: 'Une publicité, une promotion, ou ce qui vous a arrêté.',
    choiceLabel: 'La décision',
    choices: [['buy', 'J’ai choisi d’acheter'], ['pass', 'J’ai choisi de ne pas acheter'], ['later', 'Pas encore sûr']],
    noted: 'Noté.',
    clear: 'Effacer la note',
  },
  foreign: 'La capture montre l’interface en anglais.',
  save: {
    title: 'Enregistrez l’envie avant de décider',
    body: [
      'Un prix et une devise, une image, un lien ou un rappel.',
      'Sur iPhone, la feuille de partage enregistre un texte ou une URL.',
    ],
    alt: 'Éditeur d’envie dans NoBuyCart : une veste en coton, un prix de 100 €, le déclencheur, une note et une image.',
    cap: 'L’éditeur : veste en coton, 100 €, déclencheur, note, image.',
  },
  list: {
    title: 'Une veste en coton, une lampe de lecture, un sac de voyage',
    body: [
      'La liste garde chaque envie avec la décision que vous enregistrez.',
      'Appui long, puis glisser, pour réordonner. Ou un regroupement par catégorie.',
    ],
    alt: 'Liste d’envies dans NoBuyCart : une veste en coton, une lampe de lecture et un sac de voyage, chacun avec une décision.',
    cap: 'La liste : veste en coton, lampe de lecture, sac de voyage, chacun avec une décision.',
  },
  decide: {
    title: 'Trois notes, quand vous voulez',
    body: ['J’ai choisi d’acheter. J’ai choisi de ne pas acheter. Pas encore sûr.'],
    alt: 'Écran de décision dans NoBuyCart : J’ai choisi d’acheter, J’ai choisi de ne pas acheter, ou Pas encore sûr.',
    cap: 'J’ai choisi d’acheter, J’ai choisi de ne pas acheter, Pas encore sûr.',
  },
  history: {
    title: 'La décision reste sur l’envie',
    body: [
      'Ouvrez l’historique et changez la décision.',
      'Supprimez une entrée. Archivez une envie achetée, et ramenez-la quand vous en avez besoin.',
    ],
    alt: 'Historique d’une décision dans NoBuyCart, avec le bouton pour changer de décision.',
    cap: 'L’historique d’une décision, et le bouton pour la changer.',
  },
  review: {
    title: 'Vos montants, par devise et par décision',
    body: [
      'Le bilan aligne les montants que vous avez saisis, par devise et par décision.',
      'Une boutique à part : 9 produits fictifs.',
    ],
    alt: 'Bilan dans NoBuyCart : les montants saisis, regroupés par devise et par décision.',
    cap: 'Les montants saisis, par devise et par décision.',
  },
  november: {
    title: 'No Buy November',
    when: '1er au 30 novembre 2026',
    body: 'Du 1er au 30 novembre 2026, la version 1.5.0 et les suivantes ouvrent un écran No Buy November. Gratuit.',
  },
  register: {
    title: 'Le Registre, une fois',
    freeLabel: 'Gratuit',
    free: 'Les envies, les décisions, leur historique et l’aperçu du bilan.',
    paidLabel: 'Le Registre',
    paid: 'Vos décisions comparées par déclencheur, catégorie et période, et l’historique détaillé des commandes fictives.',
    price: '4,99\u00a0€, une fois.',
    kept: 'Si l’accès était déjà là, il reste.',
    },
  device: 'Vos envies restent sur l’appareil.',
  outro: 'La liste et les décisions sont gratuites.',
  other: 'Les autres apps de Benjamin Dupin',
};

const de = {
  meta: 'Notiere den Wunsch, den Preis und was ihn ausgelöst hat. Komm für die Entscheidung zurück.',
  h1: 'Notiere den Wunsch. Entscheide später.',
  lede: 'Der Preis, was den Wunsch ausgelöst hat, und die Entscheidung, wenn du zurückkommst.',
  slip: {
    name: 'Baumwolljacke',
    price: '100\u00a0€',
    promptLabel: 'Was den Wunsch ausgelöst hat',
    promptHint: 'Werbung, ein Angebot oder das, was dich aufgehalten hat.',
    choiceLabel: 'Die Entscheidung',
    choices: [['buy', 'Ich habe mich für den Kauf entschieden'], ['pass', 'Ich habe mich gegen den Kauf entschieden'], ['later', 'Noch unsicher']],
    noted: 'Notiert.',
    clear: 'Notiz löschen',
  },
  foreign: 'Das Bild zeigt die englische Oberfläche.',
  save: {
    title: 'Speichere den Wunsch, bevor du entscheidest',
    body: [
      'Preis und Währung, ein Bild, ein Link oder eine Erinnerung.',
      'Auf dem iPhone sichert das Teilen-Menü einen Text oder eine URL.',
    ],
    alt: 'Wunsch-Editor in NoBuyCart: eine Baumwolljacke, ein Preis von 100 €, Auslöser, Notiz und Bild.',
    cap: 'Der Editor: Baumwolljacke, 100 €, Auslöser, Notiz, Bild.',
  },
  list: {
    title: 'Eine Baumwolljacke, eine Leselampe, eine Reisetasche',
    body: [
      'Die Liste behält jeden Wunsch mit der Entscheidung, die du festhältst.',
      'Halte einen Wunsch gedrückt und ziehe ihn, oder gruppiere nach Kategorie.',
    ],
    alt: 'Wunschliste in NoBuyCart: Baumwolljacke, Leselampe und Reisetasche, jede mit einer Entscheidung.',
    cap: 'Die Liste: Baumwolljacke, Leselampe, Reisetasche, jede mit einer Entscheidung.',
  },
  decide: {
    title: 'Drei Notizen, wenn du so weit bist',
    body: ['Ich habe mich für den Kauf entschieden. Ich habe mich gegen den Kauf entschieden. Noch unsicher.'],
    alt: 'Entscheidung in NoBuyCart: für den Kauf, gegen den Kauf oder noch unsicher.',
    cap: 'Für den Kauf, gegen den Kauf, noch unsicher.',
  },
  history: {
    title: 'Die Entscheidung bleibt am Wunsch',
    body: [
      'Öffne den Verlauf und ändere die Entscheidung.',
      'Lösche einen Eintrag. Archiviere einen gekauften Wunsch und hole ihn zurück, wenn du ihn brauchst.',
    ],
    alt: 'Entscheidungsverlauf in NoBuyCart, mit der Steuerung zum Ändern der Entscheidung.',
    cap: 'Der Verlauf einer Entscheidung und die Steuerung, sie zu ändern.',
  },
  review: {
    title: 'Deine Beträge, nach Währung und Entscheidung',
    body: [
      'Der Rückblick ordnet die Beträge, die du eingegeben hast, nach Währung und Entscheidung.',
      'Ein eigener Shop mit 9 fiktiven Produkten.',
    ],
    alt: 'Rückblick in NoBuyCart: die eingegebenen Beträge, nach Währung und Entscheidung gruppiert.',
    cap: 'Eingegebene Beträge, nach Währung und Entscheidung.',
  },
  november: {
    title: 'No Buy November',
    when: '1. bis 30. November 2026',
    body: 'Vom 1. bis zum 30. November 2026 öffnet Version 1.5.0 und später einen Bildschirm No Buy November. Kostenlos.',
  },
  register: {
    title: 'Das Register, einmal',
    freeLabel: 'Kostenlos',
    free: 'Wünsche, Entscheidungen, ihr Verlauf und die Vorschau des Rückblicks.',
    paidLabel: 'Das Register',
    paid: 'Deine Entscheidungen im Vergleich nach Auslöser, Kategorie und Zeitraum, und der ausführliche Verlauf fiktiver Bestellungen.',
    price: '',
    kept: 'Wenn der Zugang schon da war, bleibt er.',
  },
  device: 'Deine Wünsche bleiben auf dem Gerät.',
  outro: 'Liste und Entscheidungen sind kostenlos.',
  other: 'Weitere Apps von Benjamin Dupin',
};

const es = {
  meta: 'Anota el deseo, el precio y qué lo provocó. Vuelve para la decisión.',
  h1: 'Anota el deseo. Decide después.',
  lede: 'El precio, qué te dio la idea, y la decisión cuando vuelves.',
  slip: {
    name: 'Chaqueta de algodón',
    price: '$100',
    promptLabel: 'Qué te dio la idea',
    promptHint: 'Un anuncio, una promoción o lo que te detuvo.',
    choiceLabel: 'La decisión',
    choices: [['buy', 'Decidí comprar'], ['pass', 'Decidí no comprar'], ['later', 'Aún no sé']],
    noted: 'Anotado.',
    clear: 'Borrar la nota',
  },
  foreign: 'La imagen muestra la interfaz en inglés.',
  save: {
    title: 'Guarda el deseo antes de decidir',
    body: [
      'Un precio y una moneda, una imagen, un enlace o un recordatorio.',
      'En el iPhone, la hoja de compartir guarda un texto o una URL.',
    ],
    alt: 'Editor de un deseo en NoBuyCart: una chaqueta de algodón, un precio de $100, el motivo, una nota y una imagen.',
    cap: 'El editor: chaqueta de algodón, $100, motivo, nota, imagen.',
  },
  list: {
    title: 'Una chaqueta de algodón, una lámpara de lectura, una bolsa de viaje',
    body: [
      'La lista guarda cada deseo con la decisión que registras.',
      'Mantén pulsado y arrastra para reordenar, o agrupa por categoría.',
    ],
    alt: 'Lista de deseos en NoBuyCart: chaqueta de algodón, lámpara de lectura y bolsa de viaje, cada una con una decisión.',
    cap: 'La lista: chaqueta, lámpara de lectura y bolsa de viaje, cada una con una decisión.',
  },
  decide: {
    title: 'Tres notas, cuando quieras',
    body: ['Decidí comprar. Decidí no comprar. Aún no sé.'],
    alt: 'Decisión en NoBuyCart: decidí comprar, decidí no comprar o aún no sé.',
    cap: 'Decidí comprar, decidí no comprar, aún no sé.',
  },
  history: {
    title: 'La decisión se queda en el deseo',
    body: [
      'Abre el historial y cambia la decisión.',
      'Borra una entrada. Archiva un deseo que compraste y recupéralo cuando lo necesites.',
    ],
    alt: 'Historial de una decisión en NoBuyCart, con el control para cambiar la decisión.',
    cap: 'El historial de una decisión y el control para cambiarla.',
  },
  review: {
    title: 'Tus importes, por moneda y por decisión',
    body: [
      'El resumen ordena los importes que escribiste, por moneda y por decisión.',
      'Una tienda aparte: 9 productos ficticios.',
    ],
    alt: 'Resumen en NoBuyCart: los importes que escribiste, agrupados por moneda y por decisión.',
    cap: 'Importes que escribiste, por moneda y por decisión.',
  },
  november: {
    title: 'No Buy November',
    when: '1 al 30 de noviembre de 2026',
    body: 'Del 1 al 30 de noviembre de 2026, la versión 1.5.0 y las siguientes abren una pantalla No Buy November. Gratis.',
  },
  register: {
    title: 'El Registro, una vez',
    freeLabel: 'Gratis',
    free: 'Los deseos, las decisiones, su historial y la vista previa del resumen.',
    paidLabel: 'El Registro',
    paid: 'Tus decisiones comparadas por motivo, categoría y periodo, y el historial detallado de pedidos ficticios.',
    price: '',
    kept: 'Si el acceso ya estaba, se queda.',
  },
  device: 'Tus deseos se quedan en el dispositivo.',
  outro: 'La lista y las decisiones son gratis.',
  other: 'Otras apps de Benjamin Dupin',
};

const pt = {
  meta: 'Anote a vontade, o preço e o que a provocou. Volte para a decisão.',
  h1: 'Anote a vontade. Decida depois.',
  lede: 'O preço, o que despertou a vontade, e a decisão quando você volta.',
  slip: {
    name: 'Jaqueta de algodão',
    price: 'R$\u00a0100',
    promptLabel: 'O que despertou a vontade',
    promptHint: 'Um anúncio, uma promoção ou o que fez você parar.',
    choiceLabel: 'A decisão',
    choices: [['buy', 'Decidi comprar'], ['pass', 'Decidi não comprar'], ['later', 'Ainda não sei']],
    noted: 'Anotado.',
    clear: 'Apagar a nota',
  },
  foreign: 'A imagem mostra a interface em inglês.',
  save: {
    title: 'Salve o desejo antes de decidir',
    body: [
      'Um preço e uma moeda, uma imagem, um link ou um lembrete.',
      'No iPhone, a folha de compartilhamento guarda um texto ou uma URL.',
    ],
    alt: 'Editor de um desejo no NoBuyCart: uma jaqueta de algodão, um preço de R$ 100, o motivo, uma nota e uma imagem.',
    cap: 'O editor: jaqueta de algodão, R$ 100, motivo, nota, imagem.',
  },
  list: {
    title: 'Uma jaqueta de algodão, uma luminária de leitura, uma bolsa de viagem',
    body: [
      'A lista guarda cada desejo com a decisão que você registra.',
      'Pressione e arraste para reordenar, ou agrupe por categoria.',
    ],
    alt: 'Lista de desejos no NoBuyCart: jaqueta de algodão, luminária de leitura e bolsa de viagem, cada uma com uma decisão.',
    cap: 'A lista: jaqueta, luminária de leitura e bolsa de viagem, cada uma com uma decisão.',
  },
  decide: {
    title: 'Três notas, quando você quiser',
    body: ['Decidi comprar. Decidi não comprar. Ainda não sei.'],
    alt: 'Decisão no NoBuyCart: decidi comprar, decidi não comprar ou ainda não sei.',
    cap: 'Decidi comprar, decidi não comprar, ainda não sei.',
  },
  history: {
    title: 'A decisão fica no desejo',
    body: [
      'Abra o histórico e mude a decisão.',
      'Apague uma entrada. Arquive um desejo que você comprou e traga de volta quando precisar.',
    ],
    alt: 'Histórico de uma decisão no NoBuyCart, com o controle para mudar a decisão.',
    cap: 'O histórico de uma decisão e o controle para mudá-la.',
  },
  review: {
    title: 'Seus valores, por moeda e por decisão',
    body: [
      'O resumo organiza os valores que você digitou, por moeda e por decisão.',
      'Uma loja à parte: 9 produtos fictícios.',
    ],
    alt: 'Resumo no NoBuyCart: os valores que você digitou, agrupados por moeda e por decisão.',
    cap: 'Valores que você digitou, por moeda e por decisão.',
  },
  november: {
    title: 'No Buy November',
    when: '1 a 30 de novembro de 2026',
    body: 'De 1 a 30 de novembro de 2026, a versão 1.5.0 e as seguintes abrem uma tela No Buy November. Grátis.',
  },
  register: {
    title: 'O Registro, uma vez',
    freeLabel: 'Grátis',
    free: 'Desejos, decisões, o histórico e a prévia do resumo.',
    paidLabel: 'O Registro',
    paid: 'Suas decisões comparadas por motivo, categoria e período, e o histórico detalhado de pedidos fictícios.',
    price: '',
    kept: 'Se o acesso já estava lá, ele fica.',
  },
  device: 'Seus desejos ficam no aparelho.',
  outro: 'A lista e as decisões são grátis.',
  other: 'Outros apps de Benjamin Dupin',
};

const ja = {
  meta: '欲しいもの、価格、きっかけを残す。決定は、戻ったときに。',
  h1: '欲しいものを残す。決めるのはあとで。',
  lede: '価格、欲しくなったきっかけ、そして戻ったときの決定。',
  slip: {
    name: '綿のジャケット',
    price: '¥100',
    promptLabel: '欲しくなったきっかけ',
    promptHint: '広告、セール、または足を止めたもの。',
    choiceLabel: '決定',
    choices: [['buy', '買うことにした'], ['pass', '買わないことにした'], ['later', 'まだ迷っている']],
    noted: '残しました。',
    clear: 'メモを消す',
  },
  foreign: '画像は英語の画面です。',
  save: {
    title: '決める前に、欲しいものを残す',
    body: [
      '価格と通貨、画像、リンク、リマインダー。',
      'iPhone では、共有シートからテキストまたは URL を保存できます。',
    ],
    alt: 'NoBuyCart の編集画面。綿のジャケット、価格 ¥100、きっかけ、メモ、画像。',
    cap: '編集画面。綿のジャケット、¥100、きっかけ、メモ、画像。',
  },
  list: {
    title: '綿のジャケット、読書ランプ、旅行バッグ',
    body: [
      'リストは、記録した決定と一緒に欲しいものを残します。',
      '長押ししてドラッグで並べ替えるか、カテゴリでまとめます。',
    ],
    alt: 'NoBuyCart のリスト。綿のジャケット、読書ランプ、旅行バッグ。それぞれに決定が付いています。',
    cap: 'リスト。ジャケット、読書ランプ、旅行バッグ。それぞれに決定。',
  },
  decide: {
    title: '3つのメモ。準備ができたら',
    body: ['買うことにした。買わないことにした。まだ迷っている。'],
    alt: 'NoBuyCart の決定画面。買うことにした、買わないことにした、まだ迷っている。',
    cap: '買うことにした、買わないことにした、まだ迷っている。',
  },
  history: {
    title: '決定は欲しいものに残る',
    body: [
      '履歴を開いて、決定を変更できます。',
      '履歴を1件消せます。買ったものはアーカイブして、必要なときに戻せます。',
    ],
    alt: 'NoBuyCart の決定履歴。決定を変更する操作があります。',
    cap: '決定の履歴と、決定を変更する操作。',
  },
  review: {
    title: '入れた金額を、通貨と決定ごとに',
    body: [
      '振り返りは、入力した金額を通貨と決定ごとに並べます。',
      '別のショップに、架空の商品が9つあります。',
    ],
    alt: 'NoBuyCart の振り返り。入力した金額が通貨と決定ごとにまとまっています。',
    cap: '入力した金額。通貨ごと、決定ごと。',
  },
  november: {
    title: 'No Buy November',
    when: '2026年11月1日から30日',
    body: '2026年11月1日から30日まで、バージョン 1.5.0 以降が No Buy November の画面を開きます。無料です。',
  },
  register: {
    title: '台帳は一度だけ',
    freeLabel: '無料',
    free: '欲しいもの、決定、その履歴、振り返りの概要。',
    paidLabel: '台帳',
    paid: 'きっかけ、カテゴリ、期間ごとの決定の比較と、架空の注文の詳しい履歴。',
    price: '',
    kept: 'すでにアクセスがあれば、そのまま残ります。',
  },
  device: '欲しいものは端末に残ります。',
  outro: 'リストと決定は無料です。',
  other: 'Benjamin Dupin のほかのアプリ',
};

const ko = {
  meta: '갖고 싶은 것, 가격, 계기를 남기세요. 결정은 돌아와서.',
  h1: '갖고 싶은 것을 적어요. 결정은 나중에.',
  lede: '가격, 갖고 싶어진 계기, 그리고 돌아왔을 때의 결정.',
  slip: {
    name: '면 재킷',
    price: '₩100',
    promptLabel: '갖고 싶어진 계기',
    promptHint: '광고, 할인, 또는 발걸음을 멈춘 것.',
    choiceLabel: '결정',
    choices: [['buy', '구매하기로 했어요'], ['pass', '구매하지 않기로 했어요'], ['later', '아직 모르겠어요']],
    noted: '적었어요.',
    clear: '메모 지우기',
  },
  foreign: '이미지는 영어 화면입니다.',
  save: {
    title: '결정하기 전에 위시를 남기세요',
    body: [
      '가격과 통화, 이미지, 링크, 알림.',
      'iPhone에서는 공유 시트로 텍스트나 URL을 저장해요.',
    ],
    alt: 'NoBuyCart 편집 화면. 면 재킷, 가격 ₩100, 계기, 메모, 이미지.',
    cap: '편집 화면. 면 재킷, ₩100, 계기, 메모, 이미지.',
  },
  list: {
    title: '면 재킷, 독서등, 여행 가방',
    body: [
      '목록은 기록한 결정과 함께 위시를 남겨 둡니다.',
      '길게 눌러 끌어 순서를 바꾸거나, 카테고리로 묶어요.',
    ],
    alt: 'NoBuyCart 목록. 면 재킷, 독서등, 여행 가방. 각각 결정이 있습니다.',
    cap: '목록. 재킷, 독서등, 여행 가방. 각각 결정이 있습니다.',
  },
  decide: {
    title: '세 가지 메모, 준비되면',
    body: ['구매하기로 했어요. 구매하지 않기로 했어요. 아직 모르겠어요.'],
    alt: 'NoBuyCart 결정 화면. 구매하기로 했어요, 구매하지 않기로 했어요, 아직 모르겠어요.',
    cap: '구매하기로 했어요, 구매하지 않기로 했어요, 아직 모르겠어요.',
  },
  history: {
    title: '결정은 위시에 남습니다',
    body: [
      '기록을 열고 결정을 바꿔요.',
      '기록 한 건을 지워요. 산 위시는 보관했다가 필요할 때 다시 꺼나요.',
    ],
    alt: 'NoBuyCart의 결정 기록. 결정을 바꾸는 조작이 있습니다.',
    cap: '결정 기록과, 결정을 바꾸는 조작.',
  },
  review: {
    title: '입력한 금액, 통화와 결정별로',
    body: [
      '돌아보기는 입력한 금액을 통화와 결정별로 늘어놓아요.',
      '별도의 상점에 가상 상품이 9개 있어요.',
    ],
    alt: 'NoBuyCart 돌아보기. 입력한 금액이 통화와 결정별로 모여 있습니다.',
    cap: '입력한 금액. 통화별, 결정별.',
  },
  november: {
    title: 'No Buy November',
    when: '2026년 11월 1일부터 30일',
    body: '2026년 11월 1일부터 30일까지, 버전 1.5.0 이상이 No Buy November 화면을 엽니다. 무료예요.',
  },
  register: {
    title: '기록장은 한 번',
    freeLabel: '무료',
    free: '위시, 결정, 그 기록, 돌아보기 개요.',
    paidLabel: '기록장',
    paid: '계기, 카테고리, 기간별 결정 비교와 가상 주문의 자세한 기록.',
    price: '',
    kept: '이미 접근이 있었다면, 그대로 남아요.',
  },
  device: '위시는 기기에 남아요.',
  outro: '목록과 결정은 무료예요.',
  other: 'Benjamin Dupin의 다른 앱',
};

const hans = {
  meta: '记下心愿、价格和心动的原因。回来时写下决定。',
  h1: '先记下心愿。以后再决定。',
  lede: '价格、心动的原因，以及你回来时的决定。',
  slip: {
    name: '棉夹克',
    price: '¥100',
    promptLabel: '心动的原因',
    promptHint: '一则广告、一次促销，或让你停下的东西。',
    choiceLabel: '决定',
    choices: [['buy', '我决定购买'], ['pass', '我决定不购买'], ['later', '还没想好']],
    noted: '记下了。',
    clear: '清除记录',
  },
  foreign: '图片是英文界面。',
  save: {
    title: '决定之前，先把心愿记下来',
    body: [
      '价格和货币、图片、链接或提醒。',
      '在 iPhone 上，共享菜单可以保存文字或网址。',
    ],
    alt: 'NoBuyCart 的心愿编辑：一件棉夹克，价格 ¥100，原因、备注和图片。',
    cap: '编辑画面：棉夹克，¥100，原因、备注、图片。',
  },
  list: {
    title: '一件棉夹克、一盏阅读灯、一个旅行包',
    body: [
      '列表把每条心愿和你记录的决定留在一起。',
      '长按拖动可以调整顺序，也可以按类别分组。',
    ],
    alt: 'NoBuyCart 的心愿列表：棉夹克、阅读灯和旅行包，每一条都有决定。',
    cap: '列表：棉夹克、阅读灯、旅行包，每一条都有决定。',
  },
  decide: {
    title: '三条记录，等你准备好',
    body: ['我决定购买。我决定不购买。还没想好。'],
    alt: 'NoBuyCart 的决定画面：我决定购买、我决定不购买，或还没想好。',
    cap: '我决定购买、我决定不购买、还没想好。',
  },
  history: {
    title: '决定留在这条心愿上',
    body: [
      '打开历史，更改决定。',
      '删掉一条历史。买过的心愿可以归档，需要时再取回。',
    ],
    alt: 'NoBuyCart 的决定历史，带有更改决定的操作。',
    cap: '一条决定的历史，以及更改它的操作。',
  },
  review: {
    title: '你填写的金额，按货币和决定',
    body: [
      '回顾把你填写的金额按货币和决定排好。',
      '另一间商店里有 9 件虚构商品。',
    ],
    alt: 'NoBuyCart 的回顾：你填写的金额，按货币和决定分组。',
    cap: '你填写的金额，按货币和决定。',
  },
  november: {
    title: 'No Buy November',
    when: '2026年11月1日至30日',
    body: '2026年11月1日至30日，1.5.0 及以后的版本会打开 No Buy November 画面。免费。',
  },
  register: {
    title: '记录簿，一次',
    freeLabel: '免费',
    free: '心愿、决定、它们的历史和回顾概览。',
    paidLabel: '记录簿',
    paid: '按原因、类别和时间段比较你的决定，以及虚构订单的详细历史。',
    price: '',
    kept: '如果访问权限已经在，它就还在。',
  },
  device: '心愿留在设备上。',
  outro: '清单和决定是免费的。',
  other: 'Benjamin Dupin 的其他 App',
};

const hant = {
  meta: '記下心願、價格和心動的原因。回來時寫下決定。',
  h1: '先記下心願。以後再決定。',
  lede: '價格、心動的原因，以及你回來時的決定。',
  slip: {
    name: '棉質外套',
    price: 'NT$100',
    promptLabel: '心動的原因',
    promptHint: '一則廣告、一次特價，或讓你停下的東西。',
    choiceLabel: '決定',
    choices: [['buy', '我決定購買'], ['pass', '我決定不購買'], ['later', '還沒想好']],
    noted: '記下了。',
    clear: '清除記錄',
  },
  foreign: '圖片是英文介面。',
  save: {
    title: '決定之前，先把心願記下來',
    body: [
      '價格和貨幣、圖片、連結或提醒。',
      '在 iPhone 上，分享選單可以儲存文字或網址。',
    ],
    alt: 'NoBuyCart 的心願編輯：一件棉質外套，價格 NT$100，原因、備註和圖片。',
    cap: '編輯畫面：棉質外套，NT$100，原因、備註、圖片。',
  },
  list: {
    title: '一件棉質外套、一盞閱讀燈、一個旅行包',
    body: [
      '清單把每條心願和你記錄的決定留在一起。',
      '長按拖曳可以調整順序，也可以依類別分組。',
    ],
    alt: 'NoBuyCart 的心願清單：棉質外套、閱讀燈和旅行包，每一條都有決定。',
    cap: '清單：棉質外套、閱讀燈、旅行包，每一條都有決定。',
  },
  decide: {
    title: '三則記錄，等你準備好',
    body: ['我決定購買。我決定不購買。還沒想好。'],
    alt: 'NoBuyCart 的決定畫面：我決定購買、我決定不購買，或還沒想好。',
    cap: '我決定購買、我決定不購買、還沒想好。',
  },
  history: {
    title: '決定留在這條心願上',
    body: [
      '打開歷史，更改決定。',
      '刪掉一筆歷史。買過的心願可以封存，需要時再取回。',
    ],
    alt: 'NoBuyCart 的決定歷史，帶有更改決定的操作。',
    cap: '一筆決定的歷史，以及更改它的操作。',
  },
  review: {
    title: '你填寫的金額，依貨幣和決定',
    body: [
      '回顧把你填寫的金額依貨幣和決定排好。',
      '另一間商店裡有 9 件虛構商品。',
    ],
    alt: 'NoBuyCart 的回顧：你填寫的金額，依貨幣和決定分組。',
    cap: '你填寫的金額，依貨幣和決定。',
  },
  november: {
    title: 'No Buy November',
    when: '2026年11月1日至30日',
    body: '2026年11月1日至30日，1.5.0 及之後的版本會打開 No Buy November 畫面。免費。',
  },
  register: {
    title: '記錄簿，一次',
    freeLabel: '免費',
    free: '心願、決定、它們的歷史和回顧概覽。',
    paidLabel: '記錄簿',
    paid: '依原因、類別和期間比較你的決定，以及虛構訂單的詳細歷史。',
    price: '',
    kept: '如果存取權限已經在，它就還在。',
  },
  device: '心願留在裝置上。',
  outro: '清單和決定是免費的。',
  other: 'Benjamin Dupin 的其他 App',
};

export default { en, fr, de, es, pt, ja, ko, 'zh-Hans': hans, 'zh-Hant': hant };
