# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Google Map Marker', type: :system do
  describe 'Marker action' do
    before do
      create(:one)
      visit root_path
    end
    it 'マーカーをクリックすると説明が表示される' do
      
    end
  end
end
