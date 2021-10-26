# frozen_string_literal: true

require 'rails_helper'
RSpec.describe 'Api::Maps::SearcheWord', type: :request do
  before do
    @map1 = create(:one)
    @map2 = create(:two)
    @map3 = create(:three)
    @map4 = create(:four)
  end
  it 'キーワドに合致したデータを取得する' do
    keyword = 'スタンフォード・ブリッジの戦い'
    query = { keyword: keyword }.to_query
    uri = '/api/maps/searche_word'
    get "#{uri}?#{query}"
    json = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(json.length).to eq(1)
  end
end