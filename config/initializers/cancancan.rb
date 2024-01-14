# frozen_string_literal: true

if defined?(CanCanCan)
  class Object
    def metaclass
      class << self; self; end
    end
  end

  module CanCan
    module ModelAdapters
      # rubocop:disable Style/ClassVars
      class ActiveRecordAdapter < AbstractAdapter
        @@friendly_support = {}

        def self.find(model_class, id)
          klass =
            if model_class.metaclass.ancestors.include?(ActiveRecord::Associations::CollectionProxy)
              model_class.klass
            else
              model_class
            end
          @@friendly_support[klass] ||= klass.metaclass.ancestors.include?(FriendlyId)
          @@friendly_support[klass] == true ? model_class.friendly.find(id) : model_class.find(id)
        end
      end
      # rubocop:enable Style/ClassVars
    end
  end
end
