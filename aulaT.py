import threading
import time
import random
from queue import Queue

class Coordenador:
    def __init__(self):
        self.fila_requisicoes = Queue()
        self.recurso_disponivel = True
        self.lock = threading.Lock()
    
    def requisitar_recurso(self, processo_id):
        with self.lock:
            if self.recurso_disponivel:
                self.recurso_disponivel = False
                return True
            else:
                self.fila_requisicoes.put(processo_id)
                return False
    
    def liberar_recurso(self, processo_id):
        with self.lock:
            self.recurso_disponivel = True
            if not self.fila_requisicoes.empty():
                proximo_processo = self.fila_requisicoes.get()
                print(f"Coordenador: Recurso concedido ao Processo {proximo_processo}")
                return proximo_processo
        return None

class Processo(threading.Thread):
    def __init__(self, processo_id, coordenador):
        threading.Thread.__init__(self)
        self.processo_id = processo_id
        self.coordenador = coordenador
    
    def run(self):
        while True:
            # Tempo aleatório antes de fazer nova requisição
            time.sleep(random.uniform(1, 5))
            
            print(f"Processo {self.processo_id}: Solicitando recurso")
            concedido = self.coordenador.requisitar_recurso(self.processo_id)
            
            if concedido:
                print(f"Processo {self.processo_id}: Recurso concedido. Acessando seção crítica.")
                # Simula o uso do recurso
                time.sleep(random.uniform(0.5, 2))
                print(f"Processo {self.processo_id}: Liberando recurso.")
                self.coordenador.liberar_recurso(self.processo_id)
            else:
                print(f"Processo {self.processo_id}: Recurso ocupado. Em fila de espera.")

def simular():
    print("=== SIMULAÇÃO DE EXCLUSÃO MÚTUA CENTRALIZADA ===")
    print("Criando coordenador e processos...\n")
    
    coordenador = Coordenador()
    processos = []
    
    # Criar 5 processos
    for i in range(1, 6):
        p = Processo(i, coordenador)
        processos.append(p)
        p.start()
    
    # Executar por 20 segundos
    time.sleep(20)
    
    # Encerrar processos
    for p in processos:
        p.join(timeout=0)
    
    print("\nSimulação encerrada.")

if __name__ == "__main__":
    simular()