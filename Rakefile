# encoding: UTF-8
require 'json'

SRC_DIR   = File.expand_path('../src', __FILE__)
BUILD_DIR = File.expand_path('../build', __FILE__)

MS_PARSER  = File.expand_path('../node_modules/mochiscript/bin/ms-parse', __FILE__)
MS_MATCHER = /\.ms$/
LESS_PARSER = File.expand_path('../node_modules/less/bin/lessc', __FILE__)
LESS_MATCHER = /\.less$/

def compile(src_path, matcher, parser, ext_name)
  target_path = src_path.sub(SRC_DIR, BUILD_DIR).sub(matcher, ext_name)
  target_dir  = File.dirname(target_path)

  `mkdir -p #{target_dir}`
  `#{parser} #{src_path} > #{target_path}`
end

def files(matcher, dir_path=SRC_DIR, files=[])
  file_paths = Dir.glob(dir_path + "/*")
  file_paths.each do |f|
    if File.file?(f)
      files.push(f) if f.match(matcher)
    else
      files(matcher, f, files)
    end
  end

  return files
end

task :build do
  puts "Compiling Mochiscript Files:"
  files(MS_MATCHER).each do |file|
    puts "  #{file}"
    compile(file, MS_MATCHER, MS_PARSER, ".js")
  end

  puts "Compiling Less Files:"
  files(LESS_MATCHER).each do |file|
    puts "  #{file}"
    compile(file, LESS_MATCHER, LESS_PARSER, ".css")
  end
end
