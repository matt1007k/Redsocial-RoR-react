# == Schema Information
#
# Table name: posts
#
#  id               :integer          not null, primary key
#  html_content     :text
#  markdown_content :text             not null
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#

class Post < ApplicationRecord
  belongs_to :user
  validates :markdown_content, presence: true, length: { minimum: 2 }


  def self.latest
    order("id desc")
  end
end
