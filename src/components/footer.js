import { connect } from 'react-redux';

function Footer() {
  return (
    <footer class="bg-[#0D1424] py-6">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
    <p class="text-sm text-gray-300 mb-4 md:mb-0">
      © 2024 Your Company, Inc. All rights reserved.
    </p>
    <div class="flex space-x-6 text-gray-400">
      <a href="#" class="hover:text-white">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#" class="hover:text-white">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#" class="hover:text-white">
        <i class="fab fa-x-twitter"></i>
      </a>
      <a href="#" class="hover:text-white">
        <i class="fab fa-github"></i>
      </a>
      <a href="#" class="hover:text-white">
        <i class="fab fa-youtube"></i>
      </a>
    </div>
  </div>
</footer>

  );
}

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {})(Footer);
