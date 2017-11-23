require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|

  s.name            = "react-native-safe-area"
  s.version         = version
  s.homepage        = "https://github.com/miyabi/react-native-safe-area"
  s.summary         = "React Native module to retrieve safe area insets for iOS 11 or later."
  s.license         = "MIT"
  s.author          = "Masayuki Iwai"
  s.platform        = :ios, "8.0"
  s.source          = { :git => "https://github.com/miyabi/react-native-safe-area.git", :tag => "v" + s.version.to_s }
  s.source_files    = "ios/RNSafeArea/*.{h,m}"
  s.preserve_paths  = "**/*.js"

  s.dependency 'React'
end
