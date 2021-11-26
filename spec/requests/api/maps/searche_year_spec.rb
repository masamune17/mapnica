# frozen_string_literal: true

require 'rails_helper'
describe 'API::Maps::SearcheYear', type: :request do
  before do
    create(:one)
    create(:two)
    create(:three)
    create(:four)
  end
  it '特定の年代のデータを取得する' do
    era = 1000
    query = { era: era }.to_query
    uri = '/api/maps/searche_year'
    get "#{uri}?#{query}"
    json = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(json.length).to eq(2)
  end
end
