# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, User
    can :manage, User, { id: user&.id }

    can :read, Post, { published: true }
    can :manage, Post, { user: }

    can :manage, Tag
  end
end
