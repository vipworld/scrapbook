# encoding: UTF-8
require 'json'

MS_PARSE      = File.expand_path('../node_modules/mochiscript/bin/ms-parse', __FILE__)
MS_SRC_DIR    = File.expand_path('../src', __FILE__)
JS_TARGET_DIR = File.expand_path('../build', __FILE__)

def compile(src_path)
  target_path = src_path.sub(MS_SRC_DIR, JS_TARGET_DIR).sub(/ms$/, 'js')
  target_dir  = File.dirname(target_path)

  `mkdir -p #{target_dir}`
  `node #{MS_PARSE} #{src_path} > #{target_path}`
end

def ms_files(dir_path, files=[])
  file_paths = Dir.glob(dir_path + "/*")
  file_paths.each do |f|
    if File.file?(f)
      files.push(f) if f.match(/\.ms$/)
    else
      ms_files(f, files)
    end
  end

  return files
end

task :build do
  ms_files(MS_SRC_DIR).each do |file|
    puts "Compiling: " + file
    compile(file)
  end
end
