class Api::Maps::SearcheYearController < Api::BaseController
  def index
    # ↓検索処理のコード
    searche_year = params[:era].to_i
    @all_history_position = History.where(accrual_date: "#{searche_year}-01-01"..."#{searche_year + 100}-12-31")
    # logger.debug("コントローラーでデバッグだよ")
    # logger.debug(@all_history_position.to_a)
    # logger.debug("コントローラーでデバッグだよ")
    # binding.pry
    respond_to do |format|
      # ↓検索結果のデータをレスポンスするコード
      format.json { render json: @all_history_position }
    end
  end
end
