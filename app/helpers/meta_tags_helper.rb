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
        title: :full_title,
        type: 'website',
        site_name: 'Mapnica',
        description: :description,
        image: 'https://www.mapnica.net/ogp/ogp.png',
        url: 'https://www.mapnica.net'
      },
      twitter: {
        card: 'summary_large_image',
        site: '@Masamune_catcat',
        description: :description,
        image: 'https://www.mapnica.net/ogp/ogp.png',
        domain: 'https://www.mapnica.net'
      }
    }
  end
  # rubocop:enable Metrics/MethodLength
end
