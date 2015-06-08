<?php 
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage mytheme
 * @since mytheme 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>  class="no-js">
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>"><!--[if lt IE 9]>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script><![endif]-->
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?> >
    <div id="page" class="hfeed site"><a href="#content" class="skip-link screen-reader-text">
        <?php _e( 'Skip to content', 'mytheme' ); ?></a>
      <div id="sidebar" class="sidebar">
        <header id="masthead" role="banner" class="site-header">
          <div class="site-branding">
            <?php if ( is_front_page() && is_home() ) : ?>
            <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' )); ?>" rel="home">
                <?php bloginfo( 'name' ); ?></a></h1>
            <?php else : ?>
            <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                <?php bloginfo( 'name' ); ?></a></p>
            <?php endif; ?>
            <?php $description = get_bloginfo( 'description', 'display' ); ?>
            <?php if ( $description || is_customize_preview() ) : ?>
            <p class="site-description">
              <?php echo $description; ?></p>
            <?php endif; ?>
            <button class="secondary-toggle">
              <?php echo _e( 'Menu and widgets', 'mytheme' ); ?></button>
          </div>
        </header>
        <?php get_sidebar(); ?>; ?>
      </div>
      <div id="content" class="site-content">
        <!---->
        <!-- end of header part-->
        <!-- separator mark for splitter tool--><?php 
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * @package WordPress
 * @subpackage mytheme
 * @since mytheme 1.0
 */
?>
      </div>
      <footer id="colophon" role="contentinfo" class="site-footer">
        <div class="site-info"><?php 
/**
 * Fires before the Twenty Fifteen footer text for footer customization.
 *
 * @since mytheme 1.0
 */
 do_action( 'mytheme_credits' );
?><a href="<?php echo esc_url( __( 'https://wordpress.org/', 'mytheme' ) ); ?>">
            <?php printf( __( 'Proudly powered by %s', 'mytheme' ), 'WordPress' ); ?></a>
        </div>
      </footer>
    </div>
    <?php wp_footer(); ?>
  </body>
</html>