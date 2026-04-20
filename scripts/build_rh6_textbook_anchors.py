from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ANCHOR_SPAN_TEMPLATE = '<span id="{anchor_id}" data-course-anchor="true"></span>'


@dataclass(frozen=True)
class AnchorInsertion:
  relative_path: str
  anchor_id: str
  needle: str


INSERTIONS: list[AnchorInsertion] = [
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-ancient-greeks",
    "Многие города-государства на территории современной России основали древние греки ещё в эпоху Античности.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-derbent",
    "Одним из древнейших городов нашей страны является Дербент",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-huns",
    "Большинство же учёных считают началом Великого переселения вторую половину IV в.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-nagy",
    "В 1799 г. в городе Надь-Сент-Мйклош",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-avars",
    "Но вторжение в Европу аваров в середине VI в. явилось для них настоящим бедствием.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-great-bulgaria",
    "4. Распад Великой Болгарии.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-volga-bulgaria",
    "Другая часть болгар, или булгар (как часто называют их историки), ушла на север",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/2.php.html",
    "c1-finnougrians",
    "5. Финно-угры и балты.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-slavs",
    "§ 2-3. Восточные славяне и их соседи",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-slavic-settlement",
    "1. Заселение славянами Восточно-Европейской равнины.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-slavic-economy",
    "2. Хозяйство восточных славян.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-slavic-society",
    "3. Устройство общества.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-slavic-beliefs",
    "4. Верования восточных славян.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-khazars",
    "5. Восточные славяне и хазары.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/3.php.html",
    "c1-varangians",
    "6. Восточные славяне и варяги.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/4.php.html",
    "c1-rurik",
    "1. Начало русской государственности",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/4.php.html",
    "c1-oleg-kiev",
    "2. Объединение двух центров славян Олегом",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/4.php.html",
    "c1-poludie",
    "3. Как Олег управлял государством.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/4.php.html",
    "c1-oleg-tsargrad",
    "4. Поход Олега на Царьград",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/5.php.html",
    "c1-trade-money",
    "2. Роль внешней торговли на Руси.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/5.php.html",
    "c1-igor",
    "3. Походы Игоря на греков. Восстание древлян",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/5.php.html",
    "c1-olga",
    "4. Правление Ольги",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/5.php.html",
    "c1-svyatoslav",
    "5. Походы Святослава",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/6.php.html",
    "c1-vladimir",
    "§ 7-8. Русь при Владимире Святом",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/6.php.html",
    "c1-baptism",
    "5. Крещение Руси.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/6.php.html",
    "c1-tithe-church",
    "Крещение дало мощный толчок развитию культуры.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/6.php.html",
    "c1-vladimir-folklore",
    "Князя-крестителя народ прославил в былинах.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-yaroslav",
    "§ 9. Расцвет Руси при Ярославе Мудром",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-boris-gleb",
    "Борис и Глеб погибли по приказу Святополка.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-russkaya-pravda",
    "2. Первый свод письменных законов.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-pvl",
    "В начале XII в. монах Киево-Печерского монастыря Нестор включил её в свою «Повесть временных лет».",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-sofia-kiev",
    "Величественный Софийский собор в Киеве",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-ilarion",
    "В 1051 г. главой Русской церкви стал священник княжеского храма Иларион",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/7.php.html",
    "c1-yaroslav-pechenegs",
    "В правление Ярослава на Русь не единожды нападали печенеги",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/8.php.html",
    "c1-liubech",
    "3. Княжеские съезды.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/8.php.html",
    "c1-votchina",
    "1. Развитие Руси в 1054—1132 гг.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/8.php.html",
    "c1-society",
    "5. Общество по Русской Правде.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/9.php.html",
    "c1-monomakh",
    "4. Последние годы политического единства Руси.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/9.php.html",
    "c1-monomakh-law",
    "Он успокоил народ, приняв в 1113 г. Устав о резах и закупах, который дополнил Русскую Правду.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/9.php.html",
    "c1-monomakh-teaching",
    "Владимир Мономах прославился не только как успешный князь-воин, дипломат и правитель",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/11.php.html",
    "c2-fragmentation",
    "1. Причины и особенности раздробленности",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/11.php.html",
    "c2-fragmentation-results",
    "2. Последствия раздробленности.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/12.php.html",
    "c2-yuri-moscow",
    "2. Княжение Юрия Долгорукого.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/12.php.html",
    "c2-andrei",
    "3. Княжение Андрея Боголюбского.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/12.php.html",
    "c2-vladimir-cathedral",
    "Успенский собор во Владимире, возведённый по указу Андрея Боголюбского",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/12.php.html",
    "c2-vsevolod",
    "4. Владимиро-Суздальская земля в конце XII — первой трети XIII в.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/13.php.html",
    "c2-novgorod-government",
    "4. Управление Новгородом.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/14.php.html",
    "c2-galicia",
    "4. Галицко-Волынская земля в начале XII в.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/14.php.html",
    "c2-yaroslav-osmomysl",
    "2. Княжение Ярослава Осмомысла в Галицкой земле.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/14.php.html",
    "c2-daniil",
    "Даниил отнял Галич у венгров.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/15.php.html",
    "c2-igor-word",
    "Очевидно, в конце XII в. было создано самое совершенное поэтическое произведение древнерусской литературы — «Слово о полку Игореве».",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/15.php.html",
    "c2-novgorod-architecture",
    "Северную новгородско-псковскую архитектуру отличало отсутствие богатого декора и чёткие геометрические формы.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/17.php.html",
    "c3-chinggis",
    "2. Образование империи монголов и начало походов Чингисхана.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/17.php.html",
    "c3-kalka",
    "4. Битва на Калке.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/18.php.html",
    "c3-batu",
    "3. Гибель Рязани.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/18.php.html",
    "c3-batu-campaign",
    "1. Завоевательные планы Чингисидов.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/18.php.html",
    "c3-sit",
    "В битве на реке Сити пали почти все русские воины",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/18.php.html",
    "c3-kozelsk",
    "5. Батый в Новгородской земле и «злой город» Козельск.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/18.php.html",
    "c3-kiev-fall",
    "6. Батый в Южной Руси и Центральной Европе.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/19.php.html",
    "c3-neva",
    "3. Невская битва.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/19.php.html",
    "c3-ice",
    "4. Ледовое побоище.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/20.php.html",
    "c3-horde",
    "2. Образование и расцвет Золотой Орды.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/20.php.html",
    "c3-horde-rule",
    "4. Ордынское владычество на Руси.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/20.php.html",
    "c3-census",
    "Перепись населения проводили особые чиновники — численники.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/22.php.html",
    "c3-moscow-tver",
    "3. Соперничество Москвы и Твери.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/23.php.html",
    "c3-kalita",
    "1. Московский князь Иван Калита.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/23.php.html",
    "c3-tver-uprising",
    "2. Восстание в Твери и переход великого княжения к московским князьям.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/24.php.html",
    "c3-dmitry",
    "1. Усобица в Орде и укрепление Москвы.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/24.php.html",
    "c3-vozha",
    "2. Битва на реке Воже.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/24.php.html",
    "c3-kulikovo",
    "3. Куликовская битва.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/24.php.html",
    "c3-tokhtamysh",
    "4. Нашествие Тохтамыша.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/21.php.html",
    "c4-grunwald",
    "Победа над рыцарями была одержана в сражении у деревни Грюнвальд 15 июля 1410 г.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/26.php.html",
    "c4-vasily1",
    "1. Завещание Дмитрия Донского.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/26.php.html",
    "c4-timur",
    "В 1395 г. армия Тимура опустошила города Орды.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/26.php.html",
    "c4-horde-fracture",
    "3. Распад Золотой Орды.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/26.php.html",
    "c4-feudal-war",
    "4. Борьба московских князей за престол.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/26.php.html",
    "c4-autocephaly",
    "5. Флорентийская уния и автокефалия Русской православной церкви.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/27.php.html",
    "c4-ivan3",
    "1. Задачи правления Ивана III.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/27.php.html",
    "c4-novgorod",
    "2. Присоединение к московским землям Ярославского и Ростовского княжеств.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/27.php.html",
    "c4-ugra",
    "3. Падение ордынского владычества.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/27.php.html",
    "c4-tver",
    "4. Москва — центр собирания земель.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/27.php.html",
    "c4-symbols",
    "У Ивана III ещё не было сил сражаться с османами, а вот идея о том, что Москва является преемницей православной Византии, уже осмысливалась.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/28.php.html",
    "c4-government",
    "1. Система государственного управления.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/28.php.html",
    "c4-mestnichestvo",
    "2. Местничество и право.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/28.php.html",
    "c4-sudebnik",
    "К концу XV в. Русская Правда устарела.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/28.php.html",
    "c4-service-people",
    "Служилые людей «по отечеству» имели право владеть землёй с крестьянами и не платить налоги.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/28.php.html",
    "c4-heresy",
    "4. Церковь и государство.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/29.php.html",
    "c4-vasily3",
    "1. Укрепление великокняжеской власти.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/29.php.html",
    "c4-pskov",
    "2. Присоединение Псковской земли.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/29.php.html",
    "c4-smolensk",
    "3. Включение в состав Российского (Русского) государства Смоленска.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/29.php.html",
    "c4-ryazan",
    "В 1521 г. Рязанское княжество вошло в состав Российского государства.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/30.php.html",
    "c4-fioravanti",
    "Строительство возглавил итальянский архитектор Аристотель Фиораванти.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/30.php.html",
    "c4-shatry",
    "В начале XVI в. возник новый стиль русского каменного зодчества — шатровый.",
  ),
  AnchorInsertion(
    "rh6/books/russian-history-6/books/russian-history/part-1/30.php.html",
    "c4-kolomenskoye",
    "В 1532 г. был построен первый в России памятник шатрового зодчества",
  ),
]


def inject_anchor(content: str, insertion: AnchorInsertion) -> str:
  anchor_markup = ANCHOR_SPAN_TEMPLATE.format(anchor_id=insertion.anchor_id)

  if anchor_markup in content:
    return content

  if insertion.needle not in content:
    raise ValueError(
      f"Needle not found for {insertion.anchor_id} in {insertion.relative_path}: {insertion.needle}"
    )

  return content.replace(insertion.needle, f"{anchor_markup}{insertion.needle}", 1)


def validate_anchor(content: str, insertion: AnchorInsertion) -> None:
  anchor_markup = ANCHOR_SPAN_TEMPLATE.format(anchor_id=insertion.anchor_id)
  if anchor_markup not in content:
    raise ValueError(
      f"Anchor {insertion.anchor_id} missing from {insertion.relative_path}"
    )


def main() -> None:
  touched_files: set[Path] = set()

  for insertion in INSERTIONS:
    path = ROOT / insertion.relative_path
    content = path.read_text(encoding="utf-8")
    next_content = inject_anchor(content, insertion)
    if next_content != content:
      path.write_text(next_content, encoding="utf-8")
    touched_files.add(path)

  for insertion in INSERTIONS:
    path = ROOT / insertion.relative_path
    validate_anchor(path.read_text(encoding="utf-8"), insertion)

  print(f"RH6 anchors ready: {len(INSERTIONS)} insertions across {len(touched_files)} files.")


if __name__ == "__main__":
  main()
