# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Google Map Marker', type: :system do
  describe 'Marker action' do
    before do
      create(:one)
      visit root_path
    end
    it 'マーカーをクリックすると説明が表示される' do
      pin = find('div#map').find('div[role="button"]')
      pin.click
      expect(page).to have_content '概要'
    end
  end
end
