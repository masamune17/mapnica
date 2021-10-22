class Api::Maps::SearcheWordController < Api::BaseController
  def index
    # ↓検索処理のコード    
    @history_label = History.where("label LIKE?", "%#{params[:search]}%")
    @history_abstract = History.where("abstract LIKE?", "%#{params[:search]}%")
    
    # binding.pry
    respond_to do |format|
      format.html { redirect_to :root }
      # ↓検索結果のデータをレスポンスするコード
      format.json { render json: @history_label }
      format.json { render json: @history_abstract }
    end
  end
end
