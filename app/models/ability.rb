# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Post, { published: true }
    can :manage, Post, { user: }
  end
end
