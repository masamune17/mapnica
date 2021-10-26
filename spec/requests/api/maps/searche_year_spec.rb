# frozen_string_literal: true

require 'rails_helper'
RSpec.describe 'Api::Maps::SearcheYear', type: :request do
  before do
    @map1 = create(:one)
    @map2 = create(:two)
    @map3 = create(:three)
    @map4 = create(:four)
  end
  it '特定の年代のデータを取得する' do
    era = 1000
    uri = '/api/maps/searche_year'
    get "#{uri}?era=#{era}"
    json = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(json.length).to eq(2)
  end
end
