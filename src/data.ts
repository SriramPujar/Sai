import { Aarti, SevaSuggestion, Temple } from './types';

export const AARTIS: Aarti[] = [
  {
    id: 'kakad',
    name: 'Kakad Aarti (Dawn)',
    time: '4:30 AM',
    sections: [
      {
        id: 'jodoniya-kar',
        title: 'Jodoniya Kar',
        lyrics: 'जोडुनिया कर चरणी ठेविला माथा ।\nपरिसावी विनंती माझी सद्गुरुनाथा ॥\nअसो नसो भाव आलो तुझिया ठाया ।\nकृपा दृष्टी पाहे मजकडे सद्गुरुराया ॥\nअखंडित असावे ऐसे वाटते पायी ।\nसांडुनि संकोच ठाव थोडासा देई ॥\nतुका म्हणे देवा माझी वेडीवाकुडी ।\nनामे भवपाश हाती आपुल्या तोडी ॥',
        transliteration: 'Joduniya kara charani thevila matha\nParisavi vinanti majhi Sadgurunatha\nAso naso bhava alo tujhiya thaya\nKrupa drishti pahe majakade Sadgururaya\nAkhandita asave aise vatate payi\nSanduni sankocha thava thodasa dei\nTuka mhane deva majhi vedivakudi\nName bhavapasha hati apulya todi',
        translation: 'With folded hands, I place my head at Your feet.\nPlease listen to my request, O Lord Sadguru.\nWhether I have devotion or not, I have come to Your place.\nLook at me with a compassionate glance, O King of Sadgurus.\nI wish to remain uninterrupted at Your feet.\nLeaving aside hesitation, give me a little space.\nTuka says, O God, my words may be clumsy.\nBut by Your name, break the bonds of worldly existence with Your own hands.',
        syncData: [
          { time: 0, text: 'जोडुनिया कर चरणी ठेविला माथा ।' },
          { time: 5, text: 'परिसावी विनंती माझी सद्गुरुनाथा ॥' },
          { time: 10, text: 'असो नसो भाव आलो तुझिया ठाया ।' },
          { time: 15, text: 'कृपा दृष्टी पाहे मजकडे सद्गुरुराया ॥' },
          { time: 20, text: 'अखंडित असावे ऐसे वाटते पायी ।' },
          { time: 25, text: 'सांडुनि संकोच ठाव थोडासा देई ॥' },
          { time: 30, text: 'तुका म्हणे देवा माझी वेडीवाकुडी ।' },
          { time: 35, text: 'नामे भवपाश हाती आपुल्या तोडी ॥' },
        ]
      },
      {
        id: 'utha-panduranga',
        title: 'Utha Panduranga',
        lyrics: 'उठा पांडुरंगा आता दर्शन द्या सकळा ।\nझाला अरुणोदय सरली निद्रेची वेळा ॥\nसंत साधू मुनी अवघे झालेती गोळा ।\nसोडा शेजे सुख आता बघू द्या मुखकमळा ॥\nरंग मंडपी महाद्वारी झालीसे दाटी ।\nमन उतावीळ रूप पहावया दृष्टी ॥\nराही रखुमाबाई तुम्हा येऊ द्या दया ।\nशेजे हालवूनि जागे करा देवराया ॥',
        transliteration: 'Utha Panduranga aata darshan dya sakala\nJhala arunodaya sarali nidrechi vela\nSanta sadhu muni avaghe jhaleti gola\nSoda sheje sukha aata baghu dya mukhakamala\nRanga mandapi mahadvari jhalise dati\nMana utavila rupa pahavaya drishti\nRahi Rakhumabai tumha yeu dya daya\nSheje halavuni jage kara devaraya',
        translation: 'Arise, O Panduranga, now give darshan to all.\nThe dawn has broken, the time for sleep is over.\nSaints, sages, and ascetics have all gathered.\nLeave the comfort of the bed now, let us see Your lotus face.\nThere is a crowd in the assembly hall and at the main gate.\nThe mind is eager to see Your form with its eyes.\nO Rahi and Rakhumabai, please have mercy.\nShake the bed and awaken the King of Gods.',
        syncData: [
          { time: 40, text: 'उठा पांडुरंगा आता दर्शन द्या सकळा ।' },
          { time: 45, text: 'झाला अरुणोदय सरली निद्रेची वेळा ॥' },
          { time: 50, text: 'संत साधू मुनी अवघे झालेती गोळा ।' },
          { time: 55, text: 'सोडा शेजे सुख आता बघू द्या मुखकमळा ॥' },
          { time: 60, text: 'रंग मंडपी महाद्वारी झालीसे दाटी ।' },
          { time: 65, text: 'मन उतावीळ रूप पहावया दृष्टी ॥' },
          { time: 70, text: 'राही रखुमाबाई तुम्हा येऊ द्या दया ।' },
          { time: 75, text: 'शेजे हालवूनि जागे करा देवराया ॥' },
        ]
      },
      {
        id: 'utha-utha-shri-sainath',
        title: 'Utha Utha Shri Sainath Guru',
        lyrics: 'उठा उठा श्रीसाईनाथ गुरुचरण कमळ दावा ।\nआधि व्याधि भवताप वारुनी तारा या जीवा ॥\nगेली रात्र प्रसंग जाहला उगवला रविशशी ।\nनिजले भक्त उठुनी बसले पाहती मुखकमळासी ॥',
        transliteration: 'Utha utha Shri Sainath gurucharana kamala dava\nAdhi vyadhi bhavatapa varuni tara ya jiva\nGeli ratra prasanga jahala ugavala ravishashi\nNijale bhakta uthuni basale pahati mukhakamalasi',
        translation: 'Arise, arise, O Lord Sai Nath, show us Your lotus feet.\nRemoving our mental and physical ailments and worldly heat, save this soul.\nThe night has passed, the sun and moon have risen.\nThe sleeping devotees have awakened and are sitting, waiting to see Your lotus face.',
        syncData: [
          { time: 80, text: 'उठा उठा श्रीसाईनाथ गुरुचरण कमळ दावा ।' },
          { time: 85, text: 'आधि व्याधि भवताप वारुनी तारा या जीवा ॥' },
          { time: 90, text: 'गेली रात्र प्रसंग जाहला उगवला रविशशी ।' },
          { time: 95, text: 'निजले भक्त उठुनी बसले पाहती मुखकमळासी ॥' },
        ]
      },
      {
        id: 'darshan-dya',
        title: 'Darshan Dya',
        lyrics: 'दर्शन द्या हो आतां दर्शन द्या ।\nसाईनाथ महाराज दर्शन द्या ॥\nभक्तजन अवघे वाट पाहती ।\nचरणी मस्तक ठेवूनि वंदिती ॥',
        transliteration: 'Darshan dya ho aata darshan dya\nSainath Maharaj darshan dya\nBhaktajana avaghe vata pahati\nCharani mastaka thevuni vanditi',
        translation: 'Give us darshan now, give us darshan.\nO Lord Sai Nath, give us darshan.\nAll the devotees are waiting for You.\nThey bow their heads at Your feet and worship You.',
        syncData: [
          { time: 100, text: 'दर्शन द्या हो आतां दर्शन द्या ।' },
          { time: 105, text: 'साईनाथ महाराज दर्शन द्या ॥' },
          { time: 110, text: 'भक्तजन अवघे वाट पाहती ।' },
          { time: 115, text: 'चरणी मस्तक ठेवूनि वंदिती ॥' },
        ]
      },
      {
        id: 'pancharati-kakad',
        title: 'Pancharati',
        lyrics: 'घेऊनिया पंचारती । करू बाबांची आरती ।\nसाईनाथ महाराज । भक्तजन सुखदाती ॥',
        transliteration: 'Gheuniya pancharati, karu Babanchi aarti\nSainath Maharaj, bhaktajana sukhadati',
        translation: 'Taking the five-wicked lamp, let us perform Baba\'s Aarti.\nLord Sai Nath, the bestower of happiness to the devotees.',
        syncData: [
          { time: 120, text: 'घेऊनिया पंचारती । करू बाबांची आरती ।' },
          { time: 125, text: 'साईनाथ महाराज । भक्तजन सुखदाती ॥' },
        ]
      },
      {
        id: 'chinmayarupa',
        title: 'Chinmayarupa',
        lyrics: 'चिन्मयरूपा साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nअगाध तव करणी ।\nमार्ग दाविसी अनाथा ॥',
        transliteration: 'Chinmayarupa Sainatha\nCharani thevila amhi matha\nAgadha tava karani\nMarga davisi anatha',
        translation: 'O Lord Sai Nath, the embodiment of pure consciousness.\nWe place our heads at Your feet.\nUnfathomable are Your deeds.\nYou show the path to the orphans.',
        syncData: [
          { time: 130, text: 'चिन्मयरूपा साईनाथा ।' },
          { time: 135, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 140, text: 'अगाध तव करणी ।' },
          { time: 145, text: 'मार्ग दाविसी अनाथा ॥' },
        ]
      },
      {
        id: 'pandharinatha',
        title: 'Pandharinatha',
        lyrics: 'पांडुरंगा पांडुरंगा ।\nसाईनाथा पांडुरंगा ॥\nविटेवरी उभा ।\nभक्तांलागी पांडुरंगा ॥',
        transliteration: 'Panduranga Panduranga\nSainatha Panduranga\nVitevari ubha\nBhaktalagi Panduranga',
        translation: 'O Panduranga, O Panduranga.\nO Lord Sai Nath, O Panduranga.\nStanding on the brick.\nFor the sake of Your devotees, O Panduranga.',
        syncData: [
          { time: 150, text: 'पांडुरंगा पांडुरंगा ।' },
          { time: 155, text: 'साईनाथा पांडुरंगा ॥' },
          { time: 160, text: 'विटेवरी उभा ।' },
          { time: 165, text: 'भक्तांलागी पांडुरंगा ॥' },
        ]
      },
      {
        id: 'utha-utha-pada',
        title: 'Utha Utha (Pada)',
        lyrics: 'उठा उठा हो सकळ जन ।\nकरा बाबांसी वंदन ॥\nसाईनाथ महाराज ।\nभक्तजन सुखदाती ॥',
        transliteration: 'Utha utha ho sakala jana\nKara Babansi vandana\nSainath Maharaj\nBhaktajana sukhadati',
        translation: 'Arise, arise, all people.\nBow to Baba.\nLord Sai Nath.\nThe bestower of happiness to the devotees.',
        syncData: [
          { time: 170, text: 'उठा उठा हो सकळ जन ।' },
          { time: 175, text: 'करा बाबांसी वंदन ॥' },
          { time: 180, text: 'साईनाथ महाराज ।' },
          { time: 185, text: 'भक्तजन सुखदाती ॥' },
        ]
      },
      {
        id: 'shri-sainath-prabhatashtaka',
        title: 'Shri Sainath Prabhatashtaka',
        lyrics: 'श्रीसाईनाथ प्रभाताष्टक ।\nभक्तांलागी सुखदायक ॥\nनित्य पठण करिती जे ।\nत्यांसी लाभे निजसुख ॥',
        transliteration: 'Shri Sainath Prabhatashtaka\nBhaktalagi sukhadayaka\nNitya pathana kariti je\nTyansi labhe nijasukha',
        translation: 'The morning octet of Lord Sai Nath.\nIt is a bestower of happiness to the devotees.\nThose who recite it daily.\nThey attain true happiness.',
        syncData: [
          { time: 190, text: 'श्रीसाईनाथ प्रभाताष्टक ।' },
          { time: 195, text: 'भक्तांलागी सुखदायक ॥' },
          { time: 200, text: 'नित्य पठण करिती जे ।' },
          { time: 205, text: 'त्यांसी लाभे निजसुख ॥' },
        ]
      },
      {
        id: 'sai-raham-najar-karna',
        title: 'Sai Raham Najar Karna',
        lyrics: 'साई रहम नजर करना ।\nबच्चों का पालन करना ॥\nजाना तुमने जग सारा ।\nसबका तुम हो सहारा ॥',
        transliteration: 'Sai raham nazar karna\nBachon ka palan karna\nJana tumne jaga sara\nSabka tum ho sahara',
        translation: 'O Sai, have mercy and look upon us.\nTake care of Your children.\nYou know the whole world.\nYou are the support of everyone.',
        syncData: [
          { time: 210, text: 'साई रहम नजर करना ।' },
          { time: 215, text: 'बच्चों का पालन करना ॥' },
          { time: 220, text: 'जाना तुमने जग सारा ।' },
          { time: 225, text: 'सबका तुम हो सहारा ॥' },
        ]
      },
      {
        id: 'raham-najar-karo',
        title: 'Raham Najar Karo',
        lyrics: 'रहम नजर करो अब मोरे साई ।\nतुम बिन नहीं कोई दूजा भाई ॥\nशिर्डी के तुम हो राजाधिराज ।\nभक्तों के तुम हो गरीब नवाज ॥',
        transliteration: 'Raham nazar karo ab more Sai\nTum bin nahi koi dooja bhai\nShirdi ke tum ho rajadhiraja\nBhaktone ke tum ho garib nawaz',
        translation: 'Have mercy on me now, my Sai.\nWithout You, there is no other brother.\nYou are the King of Kings of Shirdi.\nYou are the protector of the poor devotees.',
        syncData: [
          { time: 230, text: 'रहम नजर करो अब मोरे साई ।' },
          { time: 235, text: 'तुम बिन नहीं कोई दूजा भाई ॥' },
          { time: 240, text: 'शिर्डी के तुम हो राजाधिराज ।' },
          { time: 245, text: 'भक्तों के तुम हो गरीब नवाज ॥' },
        ]
      },
      {
        id: 'jani-pada',
        title: 'Jani Pada',
        lyrics: 'जनी म्हणे बाबा साई ।\nधाव पावा माझे आई ॥\nभक्तजन अवघे वाट पाहती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Jani mhane Baba Sai\nDhava pava majhe aai\nBhaktajana avaghe vata pahati\nDarshan dya ho Sainatha',
        translation: 'Jani says, O Baba Sai.\nRun to my rescue, my mother.\nAll the devotees are waiting.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 250, text: 'जनी म्हणे बाबा साई ।' },
          { time: 255, text: 'धाव पावा माझे आई ॥' },
          { time: 260, text: 'भक्तजन अवघे वाट पाहती ।' },
          { time: 265, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'shri-sadguru-pada',
        title: 'Shri Sadguru Pada',
        lyrics: 'श्रीसद्गुरु पद वंदू ।\nसाईनाथ महाराज ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Shri Sadguru pada vandu\nSainath Maharaj\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'I bow at the feet of the True Guru.\nLord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 270, text: 'श्रीसद्गुरु पद वंदू ।' },
          { time: 275, text: 'साईनाथ महाराज ॥' },
          { time: 280, text: 'भक्तजन सुखदाती ।' },
          { time: 285, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      }
    ],
    videoId: '7C_rZ0H4k0k',
    audioUrl: '/audio/Kakad_Aarti.mp3'
  },
  {
    id: 'madhyan',
    name: 'Madhyan Aarti (Noon)',
    time: '12:00 PM',
    sections: [
      {
        id: 'pancharati-madhyan',
        title: 'Pancharati',
        lyrics: 'घेऊनिया पंचारती । करू बाबांची आरती ।\nसाईनाथ महाराज । भक्तजन सुखदाती ॥',
        transliteration: 'Gheuniya pancharati, karu Babanchi aarti\nSainath Maharaj, bhaktajana sukhadati',
        translation: 'Taking the five-wicked lamp, let us perform Baba\'s Aarti.\nLord Sai Nath, the bestower of happiness to the devotees.',
        syncData: [
          { time: 0, text: 'घेऊनिया पंचारती । करू बाबांची आरती ।' },
          { time: 5, text: 'साईनाथ महाराज । भक्तजन सुखदाती ॥' },
        ]
      },
      {
        id: 'aarti-saibaba-madhyan',
        title: 'Aarti Saibaba',
        lyrics: 'आरती साईबाबा । सौख्यदातार जीवा ।\nचरणरजातळी । ध्यावा दासां विसावा, भक्तां विसावा ॥\nजाळुनिया अनंग । स्वस्वरूपी राहे दंग ।\nमुमुक्षुजनां दावी । निज डोळां श्रीरंग, डोळां श्रीरंग ॥',
        transliteration: 'Aarti Saibaba, saukhyadatara jeeva\nCharanarajatali, dhyava dasa visava, bhakta visava\nJaluniya ananga, svasvarupi rahe danga\nMumukshujana davi, nija dola Shriranga, dola Shriranga',
        translation: 'Aarti to Sai Baba, the bestower of happiness to the living beings.\nAt the dust of Your feet, the servants find rest, the devotees find rest.\nBurning the formless desires, You remain absorbed in Your own true self.\nYou show the seekers the Lord (Shriranga) with their own eyes.',
        syncData: [
          { time: 10, text: 'आरती साईबाबा । सौख्यदातार जीवा ।' },
          { time: 16, text: 'चरणरजातळी । ध्यावा दासां विसावा, भक्तां विसावा ॥' },
          { time: 22, text: 'जाळुनिया अनंग । स्वस्वरूपी राहे दंग ।' },
          { time: 28, text: 'मुमुक्षुजनां दावी । निज डोळां श्रीरंग, डोळां श्रीरंग ॥' },
        ]
      },
      {
        id: 'jay-dev-jay-dev',
        title: 'Jay Dev Jay Dev',
        lyrics: 'जय देव जय देव जय साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Jay Dev Jay Dev Jay Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Victory to the Lord, victory to the Lord, victory to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 35, text: 'जय देव जय देव जय साईनाथा ।' },
          { time: 40, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 45, text: 'भक्तजन सुखदाती ।' },
          { time: 50, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'shirdi-maze-pandharpur-madhyan',
        title: 'Shirdi Maze Pandharpur',
        lyrics: 'शिर्डी माझे पंढरपूर । साईबाबा रमावर ॥\nशुद्ध भक्ती चंद्रभागा । भाव पुंडलिक जागा ॥\nया हो या हो अवघे जन । करा बाबांसी वंदन ॥\nगणू म्हणे बाबा साई । धाव पावा माझे आई ॥',
        transliteration: 'Shirdi majhe Pandharpur, Saibaba Ramavar\nShuddha bhakti Chandrabhaga, bhava Pundalika jaga\nYa ho ya ho avaghe jana, kara Babansi vandana\nGanu mhane Baba Sai, dhava pava majhe aai',
        translation: 'Shirdi is my Pandharpur, Sai Baba is my Lord (Ramavar).\nPure devotion is the Chandrabhaga river, faith is the awakened Pundalik.\nCome, come, all people, bow to Baba.\nGanu says, O Baba Sai, run to my rescue, my mother.',
        syncData: [
          { time: 55, text: 'शिर्डी माझे पंढरपूर । साईबाबा रमावर ॥' },
          { time: 60, text: 'शुद्ध भक्ती चंद्रभागा । भाव पुंडलिक जागा ॥' },
          { time: 65, text: 'या हो या हो अवघे जन । करा बाबांसी वंदन ॥' },
          { time: 70, text: 'गणू म्हणे बाबा साई । धाव पावा माझे आई ॥' },
        ]
      },
      {
        id: 'ghalin-lotangan-madhyan',
        title: 'Ghalin Lotangan',
        lyrics: 'घालिन लोटांगण वंदीन चरण ।\nडोळ्यांनी पाहीन रूप तुझे ॥\nप्रेमे आलिंगन आनंदे पूजीन ।\nभावे ओवाळीन म्हणे नामा ॥',
        transliteration: 'Ghalin lotangan vandin charana\nDolyani pahin rupa tujhe\nPreme alingana anande pujin\nBhave owalin mhane Nama',
        translation: 'I will prostrate and bow at Your feet.\nI will see Your form with my eyes.\nI will embrace You with love and worship You with joy.\nI will wave the lamp with devotion, says Nama.',
        syncData: [
          { time: 75, text: 'घालिन लोटांगण वंदीन चरण ।' },
          { time: 80, text: 'डोळ्यांनी पाहीन रूप तुझे ॥' },
          { time: 85, text: 'प्रेमे आलिंगन आनंदे पूजीन ।' },
          { time: 90, text: 'भावे ओवाळीन म्हणे नामा ॥' },
        ]
      },
      {
        id: 'pushpanjali-madhyan',
        title: 'Pushpanjali',
        lyrics: 'मंत्रपुष्पांजली साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Pushpanjali Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Offering of flowers with mantras to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 95, text: 'मंत्रपुष्पांजली साईनाथा ।' },
          { time: 100, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 105, text: 'भक्तजन सुखदाती ।' },
          { time: 110, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'namaskarashtaka-madhyan',
        title: 'Namaskarashtaka',
        lyrics: 'नमस्काराष्टक साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Namaskarashtaka Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'The octet of salutations to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 115, text: 'नमस्काराष्टक साईनाथा ।' },
          { time: 120, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 125, text: 'भक्तजन सुखदाती ।' },
          { time: 130, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'aisa-yei-ba-madhyan',
        title: 'Aisa Yei Ba',
        lyrics: 'ऐसा येई बा साईनाथा ।\nभक्तांलागी सुखदाती ॥\nदर्शन द्या हो साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥',
        transliteration: 'Aisa yei ba Sainatha\nBhaktalagi sukhadati\nDarshan dya ho Sainatha\nCharani thevila amhi matha',
        translation: 'Come like this, O Lord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.\nWe place our heads at Your feet.',
        syncData: [
          { time: 135, text: 'ऐसा येई बा साईनाथा ।' },
          { time: 140, text: 'भक्तांलागी सुखदाती ॥' },
          { time: 145, text: 'दर्शन द्या हो साईनाथा ।' },
          { time: 150, text: 'चरणी ठेविला आम्ही माथा ॥' },
        ]
      },
      {
        id: 'shri-sainath-mahimna-stotrama-madhyan',
        title: 'Shri Sainath Mahimna Stotrama',
        lyrics: 'श्रीसाईनाथ महिम्न स्तोत्र ।\nभक्तांलागी सुखदायक ॥\nनित्य पठण करिती जे ।\nत्यांसी लाभे निजसुख ॥',
        transliteration: 'Shri Sainath Mahimna Stotrama\nBhaktalagi sukhadayaka\nNitya pathana kariti je\nTyansi labhe nijasukha',
        translation: 'The hymn of glory of Lord Sai Nath.\nIt is a bestower of happiness to the devotees.\nThose who recite it daily.\nThey attain true happiness.',
        syncData: [
          { time: 155, text: 'श्रीसाईनाथ महिम्न स्तोत्र ।' },
          { time: 160, text: 'भक्तांलागी सुखदायक ॥' },
          { time: 165, text: 'नित्य पठण करिती जे ।' },
          { time: 170, text: 'त्यांसी लाभे निजसुख ॥' },
        ]
      },
      {
        id: 'prarthana-madhyan',
        title: 'Prarthana',
        lyrics: 'प्रार्थना साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Prarthana Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Prayer to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 175, text: 'प्रार्थना साईनाथा ।' },
          { time: 180, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 185, text: 'भक्तजन सुखदाती ।' },
          { time: 190, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      }
    ],
    videoId: 'W_20wK_7y2Q',
    audioUrl: '/audio/Madhyan_Aarti.mp3'
  },
  {
    id: 'dhoop',
    name: 'Dhoop Aarti (Evening)',
    time: 'Sunset',
    sections: [
      {
        id: 'aarti-saibaba-dhoop',
        title: 'Aarti Saibaba',
        lyrics: 'आरती साईबाबा । सौख्यदातार जीवा ।\nचरणरजातळी । ध्यावा दासां विसावा, भक्तां विसावा ॥',
        transliteration: 'Aarti Saibaba, saukhyadatara jeeva\nCharanarajatali, dhyava dasa visava, bhakta visava',
        translation: 'Aarti to Sai Baba, the bestower of happiness to the living beings.\nAt the dust of Your feet, the servants find rest, the devotees find rest.',
        syncData: [
          { time: 0, text: 'आरती साईबाबा । सौख्यदातार जीवा ।' },
          { time: 7, text: 'चरणरजातळी । ध्यावा दासां विसावा, भक्तां विसावा ॥' },
        ]
      },
      {
        id: 'shirdi-maze-pandharpur-dhoop',
        title: 'Shirdi Maze Pandharpur',
        lyrics: 'शिर्डी माझे पंढरपूर । साईबाबा रमावर ॥\nशुद्ध भक्ती चंद्रभागा । भाव पुंडलिक जागा ॥\nया हो या हो अवघे जन । करा बाबांसी वंदन ॥\nगणू म्हणे बाबा साई । धाव पावा माझे आई ॥',
        transliteration: 'Shirdi majhe Pandharpur, Saibaba Ramavar\nShuddha bhakti Chandrabhaga, bhava Pundalika jaga\nYa ho ya ho avaghe jana, kara Babansi vandana\nGanu mhane Baba Sai, dhava pava majhe aai',
        translation: 'Shirdi is my Pandharpur, Sai Baba is my Lord (Ramavar).\nPure devotion is the Chandrabhaga river, faith is the awakened Pundalik.\nCome, come, all people, bow to Baba.\nGanu says, O Baba Sai, run to my rescue, my mother.',
        syncData: [
          { time: 15, text: 'शिर्डी माझे पंढरपूर । साईबाबा रमावर ॥' },
          { time: 20, text: 'शुद्ध भक्ती चंद्रभागा । भाव पुंडलिक जागा ॥' },
          { time: 25, text: 'या हो या हो अवघे जन । करा बाबांसी वंदन ॥' },
          { time: 30, text: 'गणू म्हणे बाबा साई । धाव पावा माझे आई ॥' },
        ]
      },
      {
        id: 'ghalin-lotangan-dhoop',
        title: 'Ghalin Lotangan',
        lyrics: 'घालिन लोटांगण वंदीन चरण ।\nडोळ्यांनी पाहीन रूप तुझे ॥\nप्रेमे आलिंगन आनंदे पूजीन ।\nभावे ओवाळीन म्हणे नामा ॥',
        transliteration: 'Ghalin lotangan vandin charana\nDolyani pahin rupa tujhe\nPreme alingana anande pujin\nBhave owalin mhane Nama',
        translation: 'I will prostrate and bow at Your feet.\nI will see Your form with my eyes.\nI will embrace You with love and worship You with joy.\nI will wave the lamp with devotion, says Nama.',
        syncData: [
          { time: 35, text: 'घालिन लोटांगण वंदीन चरण ।' },
          { time: 40, text: 'डोळ्यांनी पाहीन रूप तुझे ॥' },
          { time: 45, text: 'प्रेमे आलिंगन आनंदे पूजीन ।' },
          { time: 50, text: 'भावे ओवाळीन म्हणे नामा ॥' },
        ]
      },
      {
        id: 'namaskarashtaka-dhoop',
        title: 'Namaskarashtaka',
        lyrics: 'नमस्काराष्टक साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Namaskarashtaka Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'The octet of salutations to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 55, text: 'नमस्काराष्टक साईनाथा ।' },
          { time: 60, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 65, text: 'भक्तजन सुखदाती ।' },
          { time: 70, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'aisa-yei-ba-dhoop',
        title: 'Aisa Yei Ba',
        lyrics: 'ऐसा येई बा साईनाथा ।\nभक्तांलागी सुखदाती ॥\nदर्शन द्या हो साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥',
        transliteration: 'Aisa yei ba Sainatha\nBhaktalagi sukhadati\nDarshan dya ho Sainatha\nCharani thevila amhi matha',
        translation: 'Come like this, O Lord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.\nWe place our heads at Your feet.',
        syncData: [
          { time: 75, text: 'ऐसा येई बा साईनाथा ।' },
          { time: 80, text: 'भक्तांलागी सुखदाती ॥' },
          { time: 85, text: 'दर्शन द्या हो साईनाथा ।' },
          { time: 90, text: 'चरणी ठेविला आम्ही माथा ॥' },
        ]
      },
      {
        id: 'shri-sainath-mahimna-stotrama-dhoop',
        title: 'Shri Sainath Mahimna Stotrama',
        lyrics: 'श्रीसाईनाथ महिम्न स्तोत्र ।\nभक्तांलागी सुखदायक ॥\nनित्य पठण करिती जे ।\nत्यांसी लाभे निजसुख ॥',
        transliteration: 'Shri Sainath Mahimna Stotrama\nBhaktalagi sukhadayaka\nNitya pathana kariti je\nTyansi labhe nijasukha',
        translation: 'The hymn of glory of Lord Sai Nath.\nIt is a bestower of happiness to the devotees.\nThose who recite it daily.\nThey attain true happiness.',
        syncData: [
          { time: 95, text: 'श्रीसाईनाथ महिम्न स्तोत्र ।' },
          { time: 100, text: 'भक्तांलागी सुखदायक ॥' },
          { time: 105, text: 'नित्य पठण करिती जे ।' },
          { time: 110, text: 'त्यांसी लाभे निजसुख ॥' },
        ]
      },
      {
        id: 'shri-guruprasad-yachana-dhoop',
        title: 'Shri Guruprasad Yachana',
        lyrics: 'श्रीगुरुप्रसाद याचना ।\nसाईनाथ महाराज ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Shri Guruprasad Yachana\nSainath Maharaj\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Request for the Guru\'s grace.\nLord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 115, text: 'श्रीगुरुप्रसाद याचना ।' },
          { time: 120, text: 'साईनाथ महाराज ॥' },
          { time: 125, text: 'भक्तजन सुखदाती ।' },
          { time: 130, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'pushapanjali-dhoop',
        title: 'Pushapanjali',
        lyrics: 'मंत्रपुष्पांजली साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Pushpanjali Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Offering of flowers with mantras to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 135, text: 'मंत्रपुष्पांजली साईनाथा ।' },
          { time: 140, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 145, text: 'भक्तजन सुखदाती ।' },
          { time: 150, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'prarthana-dhoop',
        title: 'Prarthana',
        lyrics: 'प्रार्थना साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Prarthana Sainatha\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Prayer to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 155, text: 'प्रार्थना साईनाथा ।' },
          { time: 160, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 165, text: 'भक्तजन सुखदाती ।' },
          { time: 170, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      }
    ],
    videoId: 'P_K_h6x_w_Q',
    audioUrl: '/audio/Dhoop_Aarti.mp3'
  },
  {
    id: 'shej',
    name: 'Shej Aarti (Night)',
    time: '10:30 PM',
    sections: [
      {
        id: 'pachahi-tatavanchi-aarti',
        title: 'Pachahi Tatavanchi Aarti',
        lyrics: 'पाचही तत्त्वांची आरती ।\nसाईनाथ महाराज ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Pachahi tatavanchi aarti\nSainath Maharaj\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Aarti of the five elements.\nLord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 0, text: 'पाचही तत्त्वांची आरती ।' },
          { time: 5, text: 'साईनाथ महाराज ॥' },
          { time: 10, text: 'भक्तजन सुखदाती ।' },
          { time: 15, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'aarti-dnyanrayachi',
        title: 'Aarti Dnyanrayachi',
        lyrics: 'आरती ज्ञानराजा ।\nमहाकैवल्य तेजा ॥\nसाईनाथ महाराज ।\nभक्तजन सुखदाती ॥',
        transliteration: 'Aarti Dnyanrayachi\nMahakaivalya teja\nSainath Maharaj\nBhaktajana sukhadati',
        translation: 'Aarti to the King of Knowledge.\nThe light of supreme liberation.\nLord Sai Nath.\nThe bestower of happiness to the devotees.',
        syncData: [
          { time: 20, text: 'आरती ज्ञानराजा ।' },
          { time: 25, text: 'महाकैवल्य तेजा ॥' },
          { time: 30, text: 'साईनाथ महाराज ।' },
          { time: 35, text: 'भक्तजन सुखदाती ॥' },
        ]
      },
      {
        id: 'aarti-tukaramachi',
        title: 'Aarti Tukaramachi',
        lyrics: 'आरती तुकारामा ।\nस्वामी सद्गुरु धामा ॥\nसाईनाथ महाराज ।\nभक्तजन सुखदाती ॥',
        transliteration: 'Aarti Tukaramachi\nSwami Sadguru dhama\nSainath Maharaj\nBhaktajana sukhadati',
        translation: 'Aarti to Tukaram.\nThe abode of the True Guru.\nLord Sai Nath.\nThe bestower of happiness to the devotees.',
        syncData: [
          { time: 40, text: 'आरती तुकारामा ।' },
          { time: 45, text: 'स्वामी सद्गुरु धामा ॥' },
          { time: 50, text: 'साईनाथ महाराज ।' },
          { time: 55, text: 'भक्तजन सुखदाती ॥' },
        ]
      },
      {
        id: 'jay-jay-sainath',
        title: 'Jay Jay Sainath',
        lyrics: 'जय जय साईनाथा ।\nचरणी ठेविला आम्ही माथा ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Jay Jay Sainath\nCharani thevila amhi matha\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'Victory, victory to Lord Sai Nath.\nWe place our heads at Your feet.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 60, text: 'जय जय साईनाथा ।' },
          { time: 65, text: 'चरणी ठेविला आम्ही माथा ॥' },
          { time: 70, text: 'भक्तजन सुखदाती ।' },
          { time: 75, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'aata-swami-sukhe-shej',
        title: 'Aata Swami Sukhe',
        lyrics: 'आता स्वामी सुखे निद्रा करा अवधूता ।\nबाबा करा अवधूता ।\nचिन्मय हे सुखधाम जाउनि पहूडा एकांता ॥',
        transliteration: 'Aata Swami sukhe nidra kara avadhuta\nBaba kara avadhuta\nChinmaya he sukhadhama jauni pahuda ekanta',
        translation: 'Now, O Swami, sleep happily, O Avadhuta.\nO Baba, O Avadhuta.\nGo to the abode of pure consciousness and rest in solitude.',
        syncData: [
          { time: 80, text: 'आता स्वामी सुखे निद्रा करा अवधूता ।' },
          { time: 85, text: 'बाबा करा अवधूता ।' },
          { time: 90, text: 'चिन्मय हे सुखधाम जाउनि पहूडा एकांता ॥' },
        ]
      },
      {
        id: 'prasad-milnyakarita',
        title: 'Prasad Milnyakarita',
        lyrics: 'प्रसाद मिळण्याकरिता ।\nसाईनाथ महाराज ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Prasad milnyakarita\nSainath Maharaj\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'To receive the Prasad.\nLord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 95, text: 'प्रसाद मिळण्याकरिता ।' },
          { time: 100, text: 'साईनाथ महाराज ॥' },
          { time: 105, text: 'भक्तजन सुखदाती ।' },
          { time: 110, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      },
      {
        id: 'prasad-milalyanantar',
        title: 'Prasad Milalyanantar',
        lyrics: 'प्रसाद मिळाल्यानंतर ।\nसाईनाथ महाराज ॥\nभक्तजन सुखदाती ।\nदर्शन द्या हो साईनाथा ॥',
        transliteration: 'Prasad milalyanantar\nSainath Maharaj\nBhaktajana sukhadati\nDarshan dya ho Sainatha',
        translation: 'After receiving the Prasad.\nLord Sai Nath.\nThe bestower of happiness to the devotees.\nGive us darshan, O Lord Sai Nath.',
        syncData: [
          { time: 115, text: 'प्रसाद मिळाल्यानंतर ।' },
          { time: 120, text: 'साईनाथ महाराज ॥' },
          { time: 125, text: 'भक्तजन सुखदाती ।' },
          { time: 130, text: 'दर्शन द्या हो साईनाथा ॥' },
        ]
      }
    ],
    videoId: '1_0vK_7y2Q',
    audioUrl: '/audio/Shej_Aarti.mp3'
  }
];

export const SEVA_SUGGESTIONS: SevaSuggestion[] = [
  {
    id: '1',
    title: 'Bird Feed Seva',
    budget: 10,
    description: 'Provide grains for birds in your balcony or local park.',
    category: 'animals'
  },
  {
    id: '2',
    title: 'One Meal Seva',
    budget: 100,
    description: 'Sponsor a wholesome meal for someone in need.',
    category: 'annadanam'
  },
  {
    id: '3',
    title: 'Temple Light Seva',
    budget: 500,
    description: 'Contribute towards the oil and lamps in the temple.',
    category: 'temple'
  },
  {
    id: '4',
    title: 'Kindness Act',
    budget: 0,
    description: 'Help an elderly neighbor with their groceries.',
    category: 'kindness'
  }
];

export const TEMPLES: Temple[] = [];

export const SAI_TEACHINGS = [
  "Shraddha (Faith) and Saburi (Patience) are the two pillars of spiritual life.",
  "Why fear when I am here?",
  "I am in all beings. If you serve others, you serve Me.",
  "Cast your entire burden on Me and I will surely bear it.",
  "Unless there is some relationship or connection, nobody goes anywhere."
];
