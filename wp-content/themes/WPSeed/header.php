<?
/**
 * @author      Flurin Dürst
 * @version     1.6.0
 * @since       WPSeed 0.1
 */
?>
<!DOCTYPE html>
<html <? language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <!--=== OPEN-GRAPH TAGS ===-->
    <? wpseed_load_ogtags() ?>
    <!--=== FONTS ===-->
    <? wpseed_load_fonts() ?>
    <!--=== WP HEAD ===-->
    <? wp_head(); ?>
  </head>

  <body id="body">
      <div class="top">
        <a href="<?= get_bloginfo('url'); ?>/menu">
          <div class="logo"></div>
        </a>
      </div>
      <div class="turn-ipad col-xs-12 center-xs no-padding"><p>TURN DEVICE</p></div>
      <div id="barba-wrapper">
