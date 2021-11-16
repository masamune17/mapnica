# frozen_string_literal: true

module MetaTagsHelper
  # rubocop:disable Metrics/MethodLength
  def default_meta_tags
    {
      site: 'Mapnica',
      reverse: true,
      charset: 'utf-8',
      description: 'Mapnicaは歴史の出来事を地図上に表示するサービスです',
      viewport: 'width=device-width, initial-scale=1.0',
      keywords: '歴史, 地図, history, map',
      og: {
        title: :title,
        type: 'website',
        site_name: 'Mapnica',
        description: :description,
        image: 'http://localhost:3000/ogp/ogp.png',
        url: 'http://localhost:3000'
      },
      twitter: {
        card: 'summary',
        site: '@Masamune_catcat',
        description: :description,
        image: 'http://localhost:3000/ogp/ogp.png',
        domain: 'http://localhost:3000'
      }
    }
  end
  # rubocop:enable Metrics/MethodLength
end
