import os
import threading
import pygame

def ler():
    pygame.init()
    SCREEN_WIDTH = 600
    SCREEN_HEIGHT = 400    
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    image_file = f"./imagens/1.jpg"
    image = pygame.image.load(image_file)
    screen = pygame.display.set_mode(image.get_size())
    screen.blit(image, (0, 0))
    pygame.display.flip()

    quadrantes = {
        "mouse_up": 11,
        "mouse_down": 12,
        "mouse_left": 13,
        "mouse_right": 14,
        "mouse_click": 15,
        "key_left": 21,
        "key_right": 22,
        "key_up": 23,
        "key_down": 24
    }

    last_mouse_pos = pygame.mouse.get_pos()
    mouse_moving = False  
    pygame.mouse.set_visible(False)

    try:
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    return None

                if event.type == pygame.MOUSEBUTTONDOWN:
                    return quadrantes["mouse_click"]

                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT:
                        return quadrantes["key_left"]
                    elif event.key == pygame.K_RIGHT:
                        return quadrantes["key_right"]
                    elif event.key == pygame.K_UP:
                        return quadrantes["key_up"]
                    elif event.key == pygame.K_DOWN:
                        return quadrantes["key_down"]

            current_mouse_pos = pygame.mouse.get_pos()
            dx = current_mouse_pos[0] - last_mouse_pos[0]
            dy = current_mouse_pos[1] - last_mouse_pos[1]

            if abs(dx) > 5 or abs(dy) > 5:
                mouse_moving = True

            if mouse_moving and abs(dx) <= 5 and abs(dy) <= 5:
                mouse_moving = False
                if abs(last_mouse_pos[0] - current_mouse_pos[0]) > abs(last_mouse_pos[1] - current_mouse_pos[1]):  
                    if dx > 0:
                        return quadrantes["mouse_right"]
                    else:
                        return quadrantes["mouse_left"]
                else:  
                    if dy > 0:
                        return quadrantes["mouse_down"]
                    else:
                        return quadrantes["mouse_up"]

            last_mouse_pos = current_mouse_pos
            pygame.time.wait(10)

    finally:
        pygame.mouse.set_visible(True)


def ler_varios(quad, qtd, tol):
    count = 0  
    tolerance_used = 0  

    while True:
        detected_quad = ler()

        if detected_quad == quad:
            count += 1
            print(f"Clicou {count} vezes no quadrante certo")
            if count == qtd:
                return True  
        else:
            print("Clicou errado!")
            if tol > 0:
                tolerance_used += 1
                if tolerance_used > tol:
                    return False  


def mostrar(cod):
    pygame.init()
    image_file = os.path.abspath(os.path.join(os.path.dirname(__file__), f'../compilador/imagens/{cod}.jpg'))
    image = pygame.image.load(image_file)
    screen = pygame.display.set_mode(image.get_size())
    screen.blit(image, (0, 0))
    pygame.display.flip()

    esperar(10000)
    return screen  


def tocar(cod):
    pygame.mixer.init()
    sound_file = os.path.abspath(os.path.join(os.path.dirname(__file__), f'../compilador/sons/{cod}.mp3'))
    pygame.mixer.music.load(sound_file)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():  
        pygame.time.Clock().tick(10)


def mostrar_tocar(cod_img, cod_aud):
    screen = mostrar(cod_img)  
    tocar(cod_aud)  

    
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)

    esperar(5000)

    pygame.quit()  


def esperar(t):
    pygame.time.delay(t)
    
