#rails g scaffold Image title description image_file:attachment
class Image < ApplicationRecord
  belongs_to :post
  has_attached_file :image_file, styles: { medium: "300x300", thumb: "100x100" }
  validates_attachment_content_type :image_file, content_type: /\Aimage\/.*\z/
end
