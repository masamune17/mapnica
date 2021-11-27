# frozen_string_literal: true

require 'rails_helper'

describe '検索機能', type: :system, js: true do
  describe 'Search word' do
    before do
      create(:one)
      visit root_path
      fill_in 'search-box', with: 'スタ'
    end
    it '検索結果が表示される' do
      expect(page).to have_content 'スタンフォード・ブリッジの戦い'
    end
    it '検索結果をクリックすると解説が表示される' do
      find('#search-result0', visible: false).click
      expect(page).to have_content '概要'
    end
  end
end
