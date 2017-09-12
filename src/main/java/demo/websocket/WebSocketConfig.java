package demo.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@PropertySource("classpath:/application.properties")
public class WebSocketConfig implements WebSocketConfigurer {
  @Value("${websocket.path}")
  private String websocketPath;
  @Autowired
  private SocketHandler clientWebsocketChannelHandler;
//  @Autowired
//  private HttpHandshakeHandler httpHandshakeHandler;

  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(clientWebsocketChannelHandler, websocketPath);
      //  .addInterceptors(httpHandshakeHandler).setAllowedOrigins("*");
  }

  @Bean
  public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
    return new PropertySourcesPlaceholderConfigurer();
  }
}