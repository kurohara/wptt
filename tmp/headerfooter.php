<!DOCTYPE html>
<html <?php language_attributes(); ?> >
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?> >
    <div id="page" class="hfeed site"><a href="#content" class="skip-link screen-reader-text"><?php esc_html_e( 'Skip to content', 'mytheme' );?></a>
      <header id="masthead" role="banner" class="site-header"></header>
      <div id="content" class="site-content">
        <!-- separator mark for splitter tool-->
      </div>
    </div>
  </body>
</html>