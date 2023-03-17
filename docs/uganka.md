# Oasisova uganka

Slovenska ekipa razvijalcev pri [Oasis Network][oasis-network] je za mlade
slovenske upe pripravila programersko uganko. Počiva na *tajni* blokovni
verigi z imenom [Oasis Sapphire][oasis-explorer]. Tvoja naloga je, da
napišeš kratko skripto, ki se poveže s pametno pogodbo na našem omrežju,
tajno pridobi vprašanje in nanj odgovori. Če bo odgovor pravilen, osvojiš
kovančke ROSE! 🌹

## Blockchain, Ethereum, Solidity, Dapp, kaj za vraga?

Poznaš le C? Python? Javascript? Odlično! Vsega ostalega se boš priučil. 🎓

Porazdeljena omrežja niso enostavna reč. Programiranje porazdeljenih
aplikacij ima veliko omejitev v primerjavi z namiznimi ali spletnimi,
zato je potrebno imeti odprto glavo. Poznavanje algoritmov
in podatkovnih struktur, pisanje programske kode, ki učinkovito reši problem,
iznajdljivost pri iskanju hroščev, natančno sledenje poteku programa z
vidika varnosti in kriptografske rešitve so cenjene vrline. 🤓

## OK. Kaj moram storiti?

1. Najprej se nam pridruži na kanalu `#slovenia` na
   [Oasisovem Discord strežniku][oasis-discord]. Dostop do kanala pridobiš
   tako, da klikneš na slovensko zastavico 🇸🇮 v kanalu za pridobivanje vlog
   `#get-your-role`. Če želiš, se nam lahko nato na kratko predstaviš, lahko pa
   napišeš zgolj `živjo` in bomo zadovoljni. Z zanimanjem spremljamo slovenski
   kanal in ob nepremostljivi tehnični oviri ti bomo z veseljem pomagali. Na
   neprimerna vprašanja ti bomo odgovorili s še bolj neprimernim odgovorom. 😉

2. Če se prvič srečuješ z razvojem aplikacij za blokovne verige, si oglej
   [kratek Ethereumov vodič po pametnih pogodbah][ethereum-tutorial]. 💡

3. Bravo! Po osvojenih osnovah Ethereumovih pametnih pogodb je zdaj na
   vrsti [snovanje *tajnih* pametnih pogodb na našem dragocenem kamnu,
   Oasis Sapphire][oasis-sapphire-quickstart]. 💎

4. Pametna pogodba uganke počiva na verigi
   [Oasis Sapphire Testnet][oasis-explorer-testnet], in sicer na naslovu
   `0xb344EC101a024d3674c51bd9b6af1a3175108564`. ABI pogodbe je naslednji:

```solidity
function getQuestion(string memory coupon) external view returns (string memory)
function submitAnswer(string memory coupon, string memory answer) external
function claimReward(string memory coupon) external view returns (string memory)
```

5. Tvoja naloga je, da s pomočjo osvojenih orodij napišeš skripto, ki
   komunicira s pametno pogodbo uganke. Najprej s *tajnim klicem* do
   `getQuestion()` poizvedi za vprašanjem, vezanem na tvoj
   kupon z letaka. Nato sestavi odgovor in ga s *tajno transakcijo* do
   `submitAnswer()` pošlji nazaj. Če je odgovor pravilen, boš v naslednjem
   potrjenem bloku lahko s *tajnim klicem* do `claimReward()` pridobil
   zasebni ključ do čisto pravcatih kovančkov ROSE na verigi
   [Oasis Sapphire Mainnet][oasis-explorer]. 🎉

6. Čestitamo! Kovančke lahko uporabiš za objavo novih porazdeljenih
   aplikacij na omrežju Oasis in med prvimi na svetu izkoristiš *tajnost*
   pametnih pogodb za uresničitev svojih idej. Lahko pa kovančke pretopiš v
   ~~pivo~~ sok zate in za tvoje prijatelje v
   [bližnjem kripto lokalu][bitcoin-map]. 🍻

[oasis-network]: https://oasisprotocol.org
[oasis-discord]: https://discord.gg/oasisprotocol
[ethereum-tutorial]: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract-fullstack/
[oasis-sapphire-quickstart]: https://docs.oasis.io/dapp/sapphire/quickstart
[oasis-explorer-testnet]: https://testnet.explorer.sapphire.oasis.dev/
[oasis-explorer]: https://explorer.sapphire.oasis.io/
[bitcoin-map]: https://map.bitcoin.com
