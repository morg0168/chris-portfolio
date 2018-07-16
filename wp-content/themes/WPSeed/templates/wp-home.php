<?
/**
 * The template displaying the posts-overview
 *
 * @author      Flurin Dürst
 * @version     1.4.1
 * @since       WPSeed 0.18
 */

?>

<? get_header(); ?>

<!-- content » blog home -->

<div class="top mobile home-top">
  <a href="<?= get_bloginfo('url'); ?>/menu">
    <div class="logo"></div>
  </a>
  <button class="hamburger--squeeze is-active" id="hamburger" type="button">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</div>

  <div class="home">
    <div id="container"></div>
    <div class="row middle-xs start-xs center-sm bio">
      <div class="col-xs-12">
        <p class="intro">At 19, Christian directed the “Kill” music video for the <a href="#">Celestics</a>. Ever since, Christian's craft has brought him to work on a multitude of projects for brands like adidas® to artists like Katy Perry. His projects have been featured on The Fader, Hypebeast, Earmilk, Pigeons & Planes and Clashmusic to mention a few. To add, his concert visual design work has been viewed at festivals around the globe.
          <br/><br/> Christian currently lives in Montreal, QC, Canada. He enjoys film, electronic music & animation.</p>
          <br/><br/><br/><a href="<?= get_bloginfo('url'); ?>/menu" class="desktop">
            <div class="logo"></div>
          </a>
      </div>
    </div>
  </div>

<? get_footer(); ?>
