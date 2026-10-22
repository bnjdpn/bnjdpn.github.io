#!/usr/bin/env ruby
# frozen_string_literal: true
# Reuse an app's exact staging transformation without writing into that app.
require 'pathname'
require 'json'
require 'fileutils'
require 'digest'
repo = Pathname.new(ARGV.fetch(0)).realpath
output = Pathname.new(ARGV.fetch(1)).expand_path
allowed = Pathname.new(__dir__).join('../.local').expand_path
raise 'Output must be a fresh directory under this repository .local/' unless output.to_s.start_with?(allowed.to_s + '/') && !output.exist?
raise 'Symlink in output parents' if output.ascend.any?(&:symlink?)
require repo.join('scripts/marketing_site').to_s
generator = PortfolioMarketingSite::Generator.new(repo_root: repo, config_path: repo.join('marketing/site.json'))
# This is the same API used by stage!, which otherwise hard-codes repo/_site.
files = generator.send(:seo_stage_files)
files.each_key do |name|
  path = Pathname.new(name)
  raise "Unsafe generated path #{name}" if path.absolute? || path.each_filename.include?('..')
  generator.send(:validate_stage_relative!, name)
end
output.mkpath
files.each do |name, bytes|
  path = output.join(name)
  path.dirname.mkpath
  path.binwrite(bytes.b)
end
puts JSON.generate({ files: files.length, extensions: PortfolioMarketingSeo::SAFE_STAGE_EXTENSIONS,
                     output: output.to_s, hashes: files.transform_values { |bytes| Digest::SHA256.hexdigest(bytes.b) } })
