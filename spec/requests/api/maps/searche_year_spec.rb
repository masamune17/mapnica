# frozen_string_literal: true

require 'rails_helper'
RSpec.describe 'Api::Maps::SearcheWord', type: :request do
  it '特定の年代のデータを取得する' do
    era = 1000
    uri = '/api/maps/searche_year'

    get "#{uri}?era=#{era}"
    json = JSON.parse(response.body)

    # リクエスト成功を表す200が返ってきたか確認する。
    expect(response.status).to eq(200)

    # 正しい数のデータが返されたか確認する。
    expect(json.length).to eq(2)
  end
end
