# frozen_string_literal: true
# rubocop:disable all

FactoryBot.define do
  factory :one, class: History do
    id { 0 }
    label { 'スタンフォード・ブリッジの戦い' }
    abstract do
      'スタンフォード・ブリッジの戦い（英 Battle of Stamford Bridge）は、ノルマン・コンクエストの直前の時期に起こったイングランドでの戦い。1066年9月25日に起こった。ハロルド2世が弟トスティに勝利した結果、トスティと支援者のノルウェー王ハーラル3世は戦死、ヴァイキング（ノルウェー人）はイングランドから追放された。しかし、直後、ハロルド2世は10月14日のヘイスティングズの戦いで戦死し、ノルマンディー公ギヨーム2世がウィリアム1世として即位、ノルマン朝が始まった。'
    end
    latitude { 53.9925 }
    longitude { -0.9125 }
    accrual_date { '1066-09-25' }
  end

  factory :two, class: History do
    label { 'ヘイスティングズの戦い' }
    abstract { 'ヘイスティングズの戦い（ヘイスティングズのたたかい、英：Battle of Hastings）は、1066年にイングランドのヘイスティングスから若干内陸に入ったバトルの丘でノルマンディー公ギヨーム2世とイングランド王ハロルド2世との間で戦われた会戦である。' }
    latitude { 50.9119 }
    longitude { 0.4875 }
    accrual_date { '1066-10-14' }
  end

  factory :three, class: History do
    label { 'リスボン攻防戦' }
    abstract do
      `The siege of Lisbon, from 1 July to 25 October 1147, was the military action that brought the city of Lisbon under definitive Portuguese control and expelled its Moorish overlords. The siege of Lisbon was one of the few Christian victories of the Second Crusade—it was "the only success of the universal operation undertaken by the pilgrim army", i.e., the Second Crusade, according to the near contemporary historian Helmold, though others have questioned whether it was really part of that crusade. It is seen as a pivotal battle of the wider Reconquista. The fall of Edessa in 1144 led to a call for a new crusade by Pope Eugene III in 1145 and 1146. In the spring of 1147, the Pope authorized the crusade in the Iberian peninsula. He also authorized Alfonso VII of León and Castile to equate his campaigns against the Moors with the rest of the Second Crusade. In May 1147, a contingent of crusaders left from Dartmouth in England. They had intended to sail directly to the Holy Land, but weather forced the ships to stop on the Portuguese coast, at the northern city of Porto on 16 June 1147. There they were convinced to meet with King Afonso I of Portugal. The crusaders agreed to help the King attack Lisbon, with a solemn agreement that offered to the crusaders the pillage of the city's goods and the ransom money for expected prisoners. The siege began on 1 July. The city of Lisbon at the time of arrival consisted of sixty thousand families, including the refugees who had fled Christian onslaught from neighbouring cities of Santarém and others. Also reported by the De expugnatione Lyxbonensi is that the citadel was holding 154,000 men, not counting women and children; after 17 weeks of siege the inhabitants were despoiled and the city cleansed. After four months, the Moorish rulers agreed to surrender on 24 October, primarily because of hunger within the city. Most of the crusaders settled in the newly captured city, but some of the crusaders set sail and continued to the Holy Land. Lisbon eventually became the capital city of the Kingdom of Portugal, in 1255.`
    end
    latitude { 38.7 }
    longitude { -9.18333 }
    accrual_date { '1147-10-25' }
  end

  factory :four, class: History do
    label { 'グラーテ・ヘーゼの戦い' }
    abstract do
      'グラーテ・ヘーゼの戦い（Battle of Grathe Heath）とは、1157年10月23日にヴァルデマー1世とスヴェン3世がデンマークの王位を巡って戦った内戦。ヴァルデマー1世が勝利し、スヴェン3世は逃げようとしたところを殺された。この戦いはクヌーズ5世、ヴァルデマー1世、スヴェン3世のデンマークの王位を巡る内戦に終わりを告げた。'
    end
    latitude { 56.268 }
    longitude { 9.34121 }
    accrual_date { '1157-10-23' }
  end
end
# rubocop:enable all
